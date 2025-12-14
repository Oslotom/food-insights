import { Food } from '@/types/food';

const csvData = `navn,kategori,bearbeidingsgrad,histamin_innhold,histaminfrigjorrer,dao_blokkerende,typisk_reaksjon,inneholder_laktose,mengde_laktose,taltet_ved_laktoseintoleranse,inneholder_gluten,naturlig_glutenfri,trygg_for_coliaki,fodmap_niva,fodmap_typer,sulfitter,salicylater,tilstatt_gjaer,nitritter_nitrater,toleranse_ved_ibs,gassdannende,fiberinnhold,proteinkilde,fettkilde,karbo_kilde,viktige_mikronæringsstoffer,kaloritetthet
Kyllingbryst (fersk),Kjøtt,Fersk,Lav,Nei,Nei,Sjelden problem,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Ja,Nei,Nei,"B3, B6, selen",Lav
Laks (fersk),Fisk,Fersk,Lav,Nei,Nei,Veldig godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Ja,Ja,Nei,"D, B12, omega-3",Middels
Egg (kokt),Egg,Fersk,Lav,Ja (hvite),Nei,Hvite kan være problem,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Ja,Ja,Nei,"B12, D, kolin",Middels
Quinoa (tørr),Korn,Tørket,Lav,Nei,Nei,Svært godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Middels,Høy,Ja,Nei,Ja,"Jern, magnesium, fiber",Middels
Potet (kokt),Grønnsak,Fersk,Lav,Nei,Nei,Utmerket toleranse,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Nei,Ja,"C, B6, kalium",Lav
Brokkoli (kokt),Grønnsak,Fersk,Lav,Nei,Nei,God toleranse,Nei,,Ja,Nei,Ja,Ja,Middels,Fruktaner,Nei,Middels,Nei,Nei,Variabel,Høy,Høy,Ja,Nei,Nei,"C, K, folat",Lav
Banan (moden),Frukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Middels,Fruktose,Nei,Lav,Nei,Nei,Variabel,Middels,Middels,Nei,Nei,Ja,"B6, kalium, magnesium",Middels
Ris (hvit kokt),Korn,Kokt,Lav,Nei,Nei,Svært godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Nei,Ja,"B1, magnesium",Middels
Kikerter (hermet,uten salt),Belgfrukt,Hermetisert,Middels,Ja,Mulig,Kan forårsake oppblåsthet,Nei,,Ja,Nei,Ja,Ja,Høy,"GOS,fruktaner",Nei,Lav,Nei,Nei,Dårlig,Høy,Høy,Ja,Nei,Ja,"Jern, folat, fiber",Middels
Mandler (rå),Nøtter/Frø,Rå,Lav,Nei,Nei,Godt tolerert i moderate mengder,Nei,,Ja,Nei,Ja,Ja,Middels,,Nei,Middels,Nei,Nei,Variabel,Middels,Høy,Ja,Ja,Nei,"E, magnesium, kalsium",Høy
Kalkunbryst,Kjøtt,Fersk,Lav,Nei,Nei,Sjelden problem,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Ja,Nei,Nei,"B3, B6, sink",Lav
Torsk (fersk),Fisk,Fersk,Lav,Nei,Nei,Veldig godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Ja,Nei,Nei,"B12, jod, selen",Lav
Ærter (frosne),Belgfrukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Høy,"GOS,fruktaner",Nei,Lav,Nei,Nei,Variabel,Høy,Høy,Ja,Nei,Ja,"K, C, mangan",Lav
Havre (glutenfri),Korn,Tørket,Lav,Nei,Nei,Svært godt tolerert,Nei,,Ja,Ja (sertifisert),Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Middels,Høy,Ja,Nei,Ja,"B1, magnesium, sink",Middels
Gulrot (rå),Grønnsak,Fersk,Lav,Nei,Nei,Utmerket toleranse,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Middels,Nei,Nei,Ja,"A (beta-karoten), K, kalium",Lav
Blåbær (frosne),Frukt,Fersk,Lav,Nei,Nei,Svært godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Middels,Nei,Nei,God,Lav,Middels,Nei,Nei,Ja,"C, K, antioksidanter",Lav
Spinat (kokt),Grønnsak,Kokt,Lav,Nei,Nei,Utmerket toleranse,Nei,,Ja,Nei,Ja,Ja,Middels,Fruktaner,Nei,Middels,Nei,Nei,Variabel,Middels,Høy,Ja,Nei,Nei,"K, folat, jern",Lav
Søtpotet (kokt),Grønnsak,Kokt,Lav,Nei,Nei,Utmerket toleranse,Nei,,Ja,Nei,Ja,Ja,Middels,,Nei,Lav,Nei,Nei,God,Middels,Høy,Nei,Nei,Ja,"A (beta-karoten), C, kalium",Middels
Avokado,Frukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Høy,Nei,Ja,Nei,"K, E, folat, kalium",Høy
Jordbær,Frukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Middels,Nei,Nei,God,Middels,Middels,Nei,Nei,Ja,"C, mangan, folat",Lav
Bringebær,Frukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Middels,Nei,Nei,God,Middels,Høy,Nei,Nei,Ja,"C, K, mangan",Lav
Oksekjøtt (mager),Kjøtt,Fersk,Lav,Nei,Nei,Sjelden problem,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Ja,Nei,Nei,"B12, jern, sink",Lav
Makrell (fersk),Fisk,Fersk,Middels,Ja,Nei,Raskt danner histamin,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,Variabel,Lav,Middels,Ja,Ja,Nei,"D, omega-3, selen",Høy
Sild (fersk),Fisk,Fersk,Middels,Ja,Nei,Raskt danner histamin,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,Variabel,Lav,Middels,Ja,Ja,Nei,"D, omega-3, B12",Høy
Yoghurt (gresk,naturell),Meieri,Fermentert,Middels,Ja,Mulig,Kan være problematisk,Ja,Lav,Ja,Nei,Ja,Ja,Lav,Laktose,Nei,Lav,Ja,Nei,Variabel,Lav,Lav,Ja,Nei,Nei,"Protein, kalsium, probiotika",Middels
Ost (lagret),Meieri,Fermentert,Høy,Ja,Ja,Ofte problematisk,Ja,Lav,Ofte,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,Dårlig,Lav,Lav,Ja,Ja,Nei,"Kalsium, B12, protein",Høy
Hvetebrød,Korn,Bearbeidet,Lav,Nei,Nei,Problematisk ved cøliaki,Nei,,Nei,Ja,Nei,Nei,Høy,Fruktaner,Nei,Lav,Ja,Nei,Dårlig,Høy,Middels,Ja,Nei,Ja,"B-vitaminer, jern",Middels
Pasta (hvete),Korn,Bearbeidet,Lav,Nei,Nei,Problematisk ved cøliaki,Nei,,Nei,Ja,Nei,Nei,Høy,Fruktaner,Nei,Lav,Nei,Nei,Dårlig,Middels,Lav,Ja,Nei,Ja,"B-vitaminer, jern",Middels
Løk (rå),Grønnsak,Fersk,Lav,Nei,Nei,Kan gi mageproblemer,Nei,,Ja,Nei,Ja,Ja,Høy,Fruktaner,Nei,Lav,Nei,Nei,Dårlig,Høy,Lav,Nei,Nei,Ja,"C, B6, mangan",Lav
Hvitløk,Grønnsak,Fersk,Lav,Nei,Nei,Kan gi mageproblemer,Nei,,Ja,Nei,Ja,Ja,Høy,Fruktaner,Nei,Lav,Nei,Nei,Dårlig,Høy,Lav,Nei,Nei,Ja,"C, B6, mangan, selen",Lav
Tomat (fersk),Grønnsak,Fersk,Middels,Ja,Nei,Kan utløse reaksjoner,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Høy,Nei,Nei,Variabel,Middels,Middels,Nei,Nei,Ja,"C, K, lykopen",Lav
Paprika (rød),Grønnsak,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Høy,Nei,Nei,God,Lav,Middels,Nei,Nei,Ja,"C, A, B6",Lav
Appelsin,Frukt,Fersk,Lav,Ja,Nei,Kan utløse histaminfrigjøring,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Høy,Nei,Nei,Variabel,Lav,Middels,Nei,Nei,Ja,"C, folat, kalium",Lav
Sitron,Frukt,Fersk,Lav,Ja,Nei,Kan utløse histaminfrigjøring,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Høy,Nei,Nei,Variabel,Lav,Middels,Nei,Nei,Ja,"C, B6, kalium",Lav
Ananas,Frukt,Fersk,Middels,Ja,Nei,Kan utløse reaksjoner,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Høy,Nei,Nei,Variabel,Middels,Middels,Nei,Nei,Ja,"C, mangan, bromelain",Lav
Eple (rått),Frukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Høy,Fruktose,Nei,Middels,Nei,Nei,Variabel,Middels,Middels,Nei,Nei,Ja,"C, fiber, antioksidanter",Lav
Mango,Frukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Høy,Fruktose,Nei,Høy,Nei,Nei,Variabel,Middels,Middels,Nei,Nei,Ja,"C, A, folat",Lav
Valnøtter,Nøtter/Frø,Rå,Lav,Ja,Mulig,Kan utløse hodepine hos noen,Nei,,Ja,Nei,Ja,Ja,Middels,,Nei,Lav,Nei,Nei,Variabel,Middels,Høy,Ja,Ja,Nei,"Omega-3, magnesium, antioksidanter",Høy
Cashewnøtter,Nøtter/Frø,Rå,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Høy,,Nei,Lav,Nei,Nei,Variabel,Middels,Middels,Ja,Ja,Nei,"Jern, sink, magnesium",Høy
Linfrø,Nøtter/Frø,Rå,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Høy,,Nei,Lav,Nei,Nei,Variabel,Høy,Høy,Ja,Ja,Nei,"Omega-3, lignin, magnesium",Høy
Chiafrø,Nøtter/Frø,Rå,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Høy,,Nei,Lav,Nei,Nei,Variabel,Høy,Høy,Ja,Ja,Ja,"Omega-3, kalsium, fiber",Høy
Reker (fersk),Fisk,Fersk,Middels,Ja,Nei,Kan være problematisk,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,Variabel,Lav,Lav,Ja,Nei,Nei,"B12, jod, sink",Lav
Krabber,Fisk,Fersk,Middels,Ja,Nei,Kan være problematisk,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,Variabel,Lav,Lav,Ja,Nei,Nei,"B12, sink, kobber",Lav
Melk (vanlig),Meieri,Fersk,Lav,Nei,Nei,Problematisk ved laktoseintoleranse,Ja,Høy,Nei,Nei,Ja,Ja,Middels,Laktose,Nei,Lav,Nei,Nei,Variabel,Lav,Lav,Ja,Ja,Ja,"Kalsium, D, B12",Lav
Melk (laktosefri),Meieri,Bearbeidet,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Ja,Ja,Ja,"Kalsium, D, B12",Lav
Fløte,Meieri,Fersk,Lav,Nei,Nei,Lavere laktose,Ja,Lav,Ofte,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,Variabel,Lav,Lav,Nei,Ja,Nei,"A, D, kalsium",Høy
Smør,Meieri,Bearbeidet,Lav,Nei,Nei,Svært lite laktose,Ja,Svært lav,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Ja,Nei,"A, D, E",Høy
Squash (zucchini),Grønnsak,Fersk,Lav,Nei,Nei,Utmerket toleranse,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Nei,Ja,"C, K, kalium",Lav
Aubergine,Grønnsak,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Middels,Nei,Nei,God,Lav,Middels,Nei,Nei,Ja,"Fiber, B-vitaminer, kalium",Lav
Selleri,Grønnsak,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Middels,Polyoler,Nei,Lav,Nei,Nei,Variabel,Middels,Middels,Nei,Nei,Ja,"K, folat, kalium",Lav
Agurk,Grønnsak,Fersk,Lav,Nei,Nei,Utmerket toleranse,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Nei,Ja,"K, C, kalium",Lav
Vannmelon,Frukt,Fersk,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Høy,Fruktose,Nei,Lav,Nei,Nei,Variabel,Lav,Lav,Nei,Nei,Ja,"C, A, lykopen",Lav
Honning,Søtstoff,Bearbeidet,Lav,Nei,Nei,Høyt sukker,Nei,,Ja,Nei,Ja,Ja,Høy,Fruktose,Nei,Lav,Nei,Nei,Variabel,Lav,Lav,Nei,Nei,Ja,"Antioksidanter, mineraler",Høy
Sukker (hvit),Søtstoff,Bearbeidet,Lav,Nei,Nei,Ingen intoleranse,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Nei,Ja,Ingen,Høy
Olivenolje,Fett,Bearbeidet,Lav,Nei,Nei,Utmerket toleranse,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Ja,Nei,"E, K, antioksidanter",Høy
Kokosolje,Fett,Bearbeidet,Lav,Nei,Nei,Godt tolerert,Nei,,Ja,Nei,Ja,Ja,Lav,,Nei,Lav,Nei,Nei,God,Lav,Lav,Nei,Ja,Nei,"MCT-fettsyrer",Høy`;

function parseCSV(csv: string): Food[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map((line, index) => {
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
    
    const food: Record<string, string> = {};
    headers.forEach((header, i) => {
      food[header.trim()] = values[i] || '';
    });
    
    return {
      id: `food-${index}`,
      ...food,
    } as Food;
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
