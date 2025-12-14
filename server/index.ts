import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/analyze-food', async (req, res) => {
  try {
    const { foodName } = req.body;

    if (!foodName) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `Du er en ekspert på matvareanalyse og matintoleranse. Analyser matvaren og returner informasjon i JSON-format. 
          
Kategorier som kan brukes: Kjøtt, Fisk, Egg, Korn, Grønnsak, Frukt, Belgfrukt, Nøtter/Frø, Meieri, Drikke, Søtstoff, Fett

For histamin_innhold, fodmap_niva, toleranse_ved_ibs bruk: Lav, Middels, Høy
For Ja/Nei felt bruk: Ja, Nei
For bearbeidingsgrad bruk: Fersk, Kokt, Tørket, Hermetisert, Fermentert, Rå

Returner alltid gyldig JSON med disse feltene:
{
  "kategori": "string",
  "bearbeidingsgrad": "string",
  "histamin_innhold": "Lav|Middels|Høy",
  "histaminfrigjorrer": "Ja|Nei",
  "dao_blokkerende": "Ja|Nei",
  "typisk_reaksjon": "string",
  "inneholder_laktose": "Ja|Nei",
  "naturlig_glutenfri": "Ja|Nei",
  "fodmap_niva": "Lav|Middels|Høy",
  "fodmap_typer": "string",
  "toleranse_ved_ibs": "God|Variabel|Dårlig",
  "gassdannende": "Lav|Middels|Høy",
  "fiberinnhold": "Lav|Middels|Høy",
  "viktige_mikronæringsstoffer": "string",
  "kaloritetthet": "Lav|Middels|Høy"
}`
        },
        {
          role: "user",
          content: `Analyser denne matvaren: "${foodName}"`
        }
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    const analyzedData = JSON.parse(content || '{}');

    res.json(analyzedData);
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to analyze food', message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
