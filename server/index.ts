import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { Food } from '../src/types/food';

const app = express();
app.use(cors());
app.use(express.json());

const API_NINJAS_KEY = process.env.API_NINJAS_KEY;
if (!API_NINJAS_KEY) {
  console.error('API_NINJAS_KEY environment variable is not set.');
  process.exit(1);
}

const foodFilePath = path.join(__dirname, '..', 'food-new.csv');

async function getNextId(): Promise<number> {
  try {
    const data = await fs.readFile(foodFilePath, 'utf-8');
    const lines = data.trim().split('\n');
    if (lines.length <= 1) {
      return 1;
    }
    const lastLine = lines[lines.length - 1];
    const lastId = parseInt(lastLine.split(',')[0], 10);
    return lastId + 1;
  } catch (error) {
    console.error('Error reading food file for next ID:', error);
    return 1; // Start from 1 if file doesn't exist or is empty
  }
}

async function analyzeFoodWithApiNinjas(foodName: string): Promise<any> {
  const url = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(foodName)}`;
  const response = await fetch(url, {
    headers: { 'X-Api-Key': API_NINJAS_KEY },
  });
  if (!response.ok) {
    throw new Error(`API Ninjas error: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

function mapApiNinjasToFood(apiNinjasData: any[], foodName: string, id: number): Food {
  const item = apiNinjasData[0]; // Assuming the first item is the most relevant
  if (!item) {
    throw new Error('No nutrition data found for this food.');
  }

  // Helper to map generic values to specific Food type enums
  const mapToEnum = (value: number, lowThreshold: number, highThreshold: number): 'Lav' | 'Middels' | 'Høy' => {
    if (value <= lowThreshold) return 'Lav';
    if (value >= highThreshold) return 'Høy';
    return 'Middels';
  };

  const mapToYesNo = (value: boolean | number | string): 'Ja' | 'Nei' => {
    if (typeof value === 'boolean') return value ? 'Ja' : 'Nei';
    if (typeof value === 'number') return value > 0 ? 'Ja' : 'Nei';
    if (typeof value === 'string') return (value.toLowerCase() === 'yes' || value.toLowerCase() === 'ja') ? 'Ja' : 'Nei';
    return 'Nei';
  };

  // Default values or best guesses based on common food characteristics
  return {
    id: id,
    navn: foodName,
    kategori: "Ukjent", // API-Ninjas doesn't directly provide categories as per our enum
    underkategori: "Ukjent",
    bearbeidingsgrad: "Fersk", // Default, as API-Ninjas doesn't specify
    histamin_innhold: mapToEnum(item.histamine || 0, 10, 50), // Example thresholds, adjust as needed
    histaminfrigjorrer: "Nei", // Cannot determine from API-Ninjas
    dao_blokkerende: "Nei", // Cannot determine from API-Ninjas
    typisk_reaksjon: "", // Cannot determine from API-Ninjas
    inneholder_laktose: mapToYesNo(item.sugar_g > 0 && item.sugar_g / item.serving_size_g > 0.05), // Guess based on sugar content
    naturlig_glutenfri: "Nei", // Cannot determine easily, default to Nei
    fodmap_niva: mapToEnum(item.carbohydrates_total_g, 5, 20), // Guess based on total carbs
    fodmap_typer: "", // Cannot determine from API-Ninjas
    toleranse_ved_ibs: "Variabel", // Default, as API-Ninjas doesn't specify
    gassdannende: mapToEnum(item.fiber_g, 2, 5), // Guess based on fiber content
    fiberinnhold: mapToEnum(item.fiber_g, 2, 5),
    viktige_mikronæringsstoffer: "Ukjent", // API-Ninjas provides specific vitamins/minerals, would need detailed mapping
    kaloritetthet: mapToEnum(item.calories, 100, 250), // Guess based on calories per serving
  };
}


app.post('/api/food', async (req, res) => {
  try {
    const { foodName } = req.body;
    if (!foodName) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    const apiNinjasData = await analyzeFoodWithApiNinjas(foodName);
    if (!apiNinjasData || apiNinjasData.length === 0) {
      return res.status(404).json({ error: 'No data found for this food item from API Ninjas.' });
    }

    const newId = await getNextId();
    const newFood: Food = mapApiNinjasToFood(apiNinjasData, foodName, newId);

    // Prepare CSV line - ensure all fields are present and correctly escaped
    const headers = [
        "id", "navn", "kategori", "underkategori", "bearbeidingsgrad", 
        "histamin_innhold", "histaminfrigjorrer", "dao_blokkerende", 
        "typisk_reaksjon", "inneholder_laktose", "naturlig_glutenfri", 
        "fodmap_niva", "fodmap_typer", "toleranse_ved_ibs", 
        "gassdannende", "fiberinnhold", "viktige_mikronæringsstoffer", "kaloritetthet"
    ];

    const existingData = await fs.readFile(foodFilePath, 'utf-8');
    const needsHeader = existingData.trim().split('\n').length === 0;

    let csvLine = needsHeader ? headers.map(h => `"${h}"`).join(',') + '\n' : '';
    csvLine += headers.map(header => {
        const value = newFood[header as keyof Food];
        // Ensure values are strings and handle potential commas by wrapping in quotes
        return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',');

    await fs.appendFile(foodFilePath, csvLine + '\n'); // Add newline for new entry

    res.status(201).json(newFood);
  } catch (error: any) {
    console.error('Error adding food:', error);
    res.status(500).json({ error: 'Failed to add food', message: error.message });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
