const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvContent = fs.readFileSync('food-new.csv', 'utf8');

// Escape backticks in CSV content
const escapedCsv = csvContent.replace(/`/g, '\\`');

// Create the TypeScript file with the CSV as a template literal
const tsCode = `import { Food } from '@/types/food';

const csvData = \`${escapedCsv}\`;

function parseCSV(csv: string): Food[] {
  const lines = csv.trim().split('\\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map((line, index) => {
      // Parse CSV with proper quote handling
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const food: any = { id: \`food-\${index}\` };
      headers.forEach((header, i) => {
        if (header && header.trim()) {
          food[header.trim()] = values[i] || '';
        }
      });
      
      return food as Food;
    });
}

export const foods: Food[] = parseCSV(csvData);

export const categories = [
  'Alle',
  'Kjøtt',
  'Fisk',
  'Egg',
  'Korn',
  'Grønnsak',
  'Frukt',
  'Belgfrukt',
  'Nøtter/Frø',
  'Meieri',
  'Søtstoff',
  'Fett',
] as const;

export const categoryEmojis: Record<string, string> = {
  'Kjøtt': '🥩',
  'Fisk': '🐟',
  'Egg': '🥚',
  'Korn': '🌾',
  'Grønnsak': '🥦',
  'Frukt': '🍎',
  'Belgfrukt': '🫘',
  'Nøtter/Frø': '🥜',
  'Meieri': '🥛',
  'Søtstoff': '🍯',
  'Fett': '🫒',
  'Alle': '🍽️',
};
`;

// Write the new file
fs.writeFileSync('src/data/foodData.ts', tsCode, 'utf8');
console.log('Updated foodData.ts successfully');
console.log('File size:', Math.round(tsCode.length / 1024), 'KB');
