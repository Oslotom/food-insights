import { Food } from '@/types/food';

// Food knowledge base for basic analysis
const foodDatabase: Record<string, Partial<Food>> = {
  'brokkoli': {
    kategori: 'Grønnsak',
    bearbeidingsgrad: 'Rå',
    histamin_innhold: 'Lav',
    histaminfrigjorrer: 'Nei',
    dao_blokkerende: 'Nei',
    typisk_reaksjon: 'Ingen',
    inneholder_laktose: 'Nei',
    mengde_laktose: 'Ingen',
    taltet_ved_laktoseintoleranse: 'Ja',
    inneholder_gluten: 'Nei',
    naturlig_glutenfri: 'Ja',
    trygg_for_coliaki: 'Ja',
    fodmap_niva: 'Lav',
    fodmap_typer: 'Ingen',
    sulfitter: 'Nei',
    salicylater: 'Middels',
    tilstatt_gjaer: 'Nei',
    nitritter_nitrater: 'Nei',
    toleranse_ved_ibs: 'God',
    gassdannende: 'Middels',
    fiberinnhold: 'Høy',
    proteinkilde: 'Plante',
    fettkilde: 'Minimal',
    karbo_kilde: 'Karbohydrater',
    viktige_mikronæringsstoffer: 'Vitamin C, K, folat',
    kaloritetthet: 'Lav',
  },
  'kyllingbryst': {
    kategori: 'Kjøtt',
    bearbeidingsgrad: 'Rå',
    histamin_innhold: 'Lav',
    histaminfrigjorrer: 'Nei',
    dao_blokkerende: 'Nei',
    typisk_reaksjon: 'Ingen',
    inneholder_laktose: 'Nei',
    mengde_laktose: 'Ingen',
    taltet_ved_laktoseintoleranse: 'Ja',
    inneholder_gluten: 'Nei',
    naturlig_glutenfri: 'Ja',
    trygg_for_coliaki: 'Ja',
    fodmap_niva: 'Lav',
    fodmap_typer: 'Ingen',
    sulfitter: 'Nei',
    salicylater: 'Nei',
    tilstatt_gjaer: 'Nei',
    nitritter_nitrater: 'Nei',
    toleranse_ved_ibs: 'God',
    gassdannende: 'Lav',
    fiberinnhold: 'Lav',
    proteinkilde: 'Dyr',
    fettkilde: 'Dyrefett',
    karbo_kilde: 'Ingen',
    viktige_mikronæringsstoffer: 'Protein, B12, selen',
    kaloritetthet: 'Middels',
  },
  'ris': {
    kategori: 'Korn',
    bearbeidingsgrad: 'Tilberedt',
    histamin_innhold: 'Lav',
    histaminfrigjorrer: 'Nei',
    dao_blokkerende: 'Nei',
    typisk_reaksjon: 'Ingen',
    inneholder_laktose: 'Nei',
    mengde_laktose: 'Ingen',
    taltet_ved_laktoseintoleranse: 'Ja',
    inneholder_gluten: 'Nei',
    naturlig_glutenfri: 'Ja',
    trygg_for_coliaki: 'Ja',
    fodmap_niva: 'Lav',
    fodmap_typer: 'Ingen',
    sulfitter: 'Nei',
    salicylater: 'Nei',
    tilstatt_gjaer: 'Nei',
    nitritter_nitrater: 'Nei',
    toleranse_ved_ibs: 'God',
    gassdannende: 'Lav',
    fiberinnhold: 'Lav',
    proteinkilde: 'Plante',
    fettkilde: 'Minimal',
    karbo_kilde: 'Karbohydrater',
    viktige_mikronæringsstoffer: 'Vitaminer B, magnesium',
    kaloritetthet: 'Høy',
  },
  'tomat': {
    kategori: 'Grønnsak',
    bearbeidingsgrad: 'Rå',
    histamin_innhold: 'Middels',
    histaminfrigjorrer: 'Ja',
    dao_blokkerende: 'Ja',
    typisk_reaksjon: 'Mulig hos noen',
    inneholder_laktose: 'Nei',
    mengde_laktose: 'Ingen',
    taltet_ved_laktoseintoleranse: 'Ja',
    inneholder_gluten: 'Nei',
    naturlig_glutenfri: 'Ja',
    trygg_for_coliaki: 'Ja',
    fodmap_niva: 'Lav',
    fodmap_typer: 'Ingen',
    sulfitter: 'Nei',
    salicylater: 'Høy',
    tilstatt_gjaer: 'Nei',
    nitritter_nitrater: 'Nei',
    toleranse_ved_ibs: 'Variabel',
    gassdannende: 'Lav',
    fiberinnhold: 'Middels',
    proteinkilde: 'Plante',
    fettkilde: 'Minimal',
    karbo_kilde: 'Karbohydrater',
    viktige_mikronæringsstoffer: 'Vitamin C, lykopen',
    kaloritetthet: 'Lav',
  },
};

// Default values for unknown foods
const defaultFoodValues: Omit<Food, 'id' | 'navn'> = {
  kategori: 'Annet',
  bearbeidingsgrad: 'Ukjent',
  histamin_innhold: 'Middels',
  histaminfrigjorrer: 'Ukjent',
  dao_blokkerende: 'Ukjent',
  typisk_reaksjon: 'Kan variere',
  inneholder_laktose: 'Ukjent',
  mengde_laktose: 'Ukjent',
  taltet_ved_laktoseintoleranse: 'Usikkert',
  inneholder_gluten: 'Ukjent',
  naturlig_glutenfri: 'Usikkert',
  trygg_for_coliaki: 'Usikkert',
  fodmap_niva: 'Middels',
  fodmap_typer: 'Ukjent',
  sulfitter: 'Ukjent',
  salicylater: 'Ukjent',
  tilstatt_gjaer: 'Nei',
  nitritter_nitrater: 'Nei',
  toleranse_ved_ibs: 'Variabel',
  gassdannende: 'Middels',
  fiberinnhold: 'Middels',
  proteinkilde: 'Ukjent',
  fettkilde: 'Ukjent',
  karbo_kilde: 'Ukjent',
  viktige_mikronæringsstoffer: 'Ukjent',
  kaloritetthet: 'Middels',
};

export function analyzeFoodName(foodName: string): Omit<Food, 'id' | 'navn'> {
  const normalizedName = foodName.toLowerCase().trim();

  // Check if we have data for this food
  for (const [key, values] of Object.entries(foodDatabase)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return { ...defaultFoodValues, ...values };
    }
  }

  // Check partial matches
  for (const [key, values] of Object.entries(foodDatabase)) {
    if (normalizedName.includes(key.slice(0, 3)) || key.includes(normalizedName.slice(0, 3))) {
      return { ...defaultFoodValues, ...values };
    }
  }

  // Return defaults for unknown foods
  return defaultFoodValues;
}
