const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    return { mentalModels: [], northStar: null };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/models', (req, res) => {
  const data = readData();
  res.json(data.mentalModels || []);
});

app.get('/api/north-star', (req, res) => {
  const data = readData();
  res.json(data.northStar || null);
});

app.post('/api/north-star', (req, res) => {
  const data = readData();
  data.northStar = req.body;
  writeData(data);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
