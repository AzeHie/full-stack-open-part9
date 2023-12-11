import express = require('express');
import bodyParser from 'body-parser';

import calculateWebBmi from './webBmi';
import calculateWebExercises from './webExercises';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query) {
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json('parameters missing');
  }

  if (
    !Array.isArray(daily_exercises) ||
    typeof target !== 'number' ||
    Number.isNaN(target)
  ) {
    res.status(400).json('malformatted parameters');
  }

  try {
    const result = calculateWebExercises(
      daily_exercises as number[],
      target as number
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json('Something went wrong');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
