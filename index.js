// backend/index.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Die korrekte Route, die dein Frontend aufruft:
app.post('/api/gehalt', (req, res) => {
  const { gehalt, steuerklasse, kirchensteuer } = req.body;

  if (typeof gehalt !== 'number' || gehalt <= 0) {
    return res.status(400).json({ error: 'Ungültiges Gehalt' });
  }

  // Beispiel-Berechnung:
  const Lohnsteuer           = gehalt * 0.15;
  const Rentenversicherung   = gehalt * 0.093;
  const Krankenversicherung  = gehalt * 0.08;
  const Pflegeversicherung   = gehalt * 0.03;
  const netto = gehalt - (lohnsteuer + rentenversicherung + krankenversicherung + pflegeversicherung);

  return res.json({
    netto: netto,
    abzuege: {
      Lohnsteuer: lohnsteuer,
      Rentenversicherung: rentenversicherung,
      Krankenversicherung: krankenversicherung,
      Pflegeversicherung: pflegeversicherung,
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf Port ${PORT}`);
});
