import express = require('express');
import calculateWebBmi from './webBmi';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(!req.query) {
    res.status(400).json('parameters missing!');
  }

  const { height, weight } = req.query;


  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json('malformatted parameters');
  }

  const numHeight = Number(height);
  const numWeight = Number(weight);

  try {
    const bmi = calculateWebBmi(numHeight, numWeight);

    res.status(200).json({
      height: numHeight,
      weight: numWeight,
      bmi: bmi,
    });
  } catch (error) {
    res.status(400).json('Something went wrong!');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
