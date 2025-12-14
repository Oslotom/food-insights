import { Food } from '@/types/food';

const rawCSV = require('./foods-raw.csv?raw').default;

function parseCSV(csv: string): Food[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map((line, index) => {
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
      
      const food: Record<string, any> = { id: `food-${index}` };
      headers.forEach((header, i) => {
        if (header) {
          food[header] = values[i] || '';
        }
      });
      
      return food as Food;
    });
}

export const foods: Food[] = parseCSV(rawCSV);

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
