export interface Food {
  id: string;
  navn: string;
  kategori: string;
  bearbeidingsgrad: string;
  underkategori?: string;
  histamin_innhold: 'Lav' | 'Middels' | 'Høy';
  histaminfrigjorrer: string;
  dao_blokkerende: string;
  typisk_reaksjon: string;
  inneholder_laktose: string;
  mengde_laktose: string;
  taltet_ved_laktoseintoleranse: string;
  inneholder_gluten: string;
  naturlig_glutenfri: string;
  trygg_for_coliaki: string;
  fodmap_niva: 'Lav' | 'Middels' | 'Høy';
  fodmap_typer: string;
  sulfitter: string;
  salicylater: string;
  tilstatt_gjaer: string;
  nitritter_nitrater: string;
  toleranse_ved_ibs: 'God' | 'Variabel' | 'Dårlig';
  gassdannende: 'Lav' | 'Middels' | 'Høy';
  fiberinnhold: 'Lav' | 'Middels' | 'Høy';
  proteinkilde: string;
  fettkilde: string;
  karbo_kilde: string;
  viktige_mikronæringsstoffer: string;
  kaloritetthet: 'Lav' | 'Middels' | 'Høy';
}

export type ToleranceLevel = 'Lav' | 'Middels' | 'Høy' | 'God' | 'Variabel' | 'Dårlig';

export type Category = 
  | 'Kjøtt' 
  | 'Fisk' 
  | 'Egg' 
  | 'Korn' 
  | 'Grønnsak' 
  | 'Frukt' 
  | 'Belgfrukt' 
  | 'Nøtter/Frø' 
  | 'Meieri'
  | 'Drikke'
  | 'Alle';

export interface FilterState {
  search: string;
  category: Category;
  histaminSafe: boolean;
  glutenFree: boolean;
  lactoseFree: boolean;
  lowFodmap: boolean;
}
