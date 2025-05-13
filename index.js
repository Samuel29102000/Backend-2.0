import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/gehalt', (req, res) => {
  const { brutto, steuerSatz } = req.body;

  if (typeof brutto !== 'number' || typeof steuerSatz !== 'number') {
    return res.status(400).json({ error: 'Ungültige Eingabe' });
  }

  const steuer = brutto * (steuerSatz / 100);
  const netto = brutto - steuer;

  res.json({ brutto, steuer, netto });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
