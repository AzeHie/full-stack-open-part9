import parseArgs from './parseArgs';

interface Meters {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = (weight / (height * height)) * 10000;

  if (bmi > 29.9) {
    return 'Obese';
  } else if (bmi > 24.9 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Normal, healthy weight';
  }
};

try {
  const { height, weight } = parseArgs(process.argv);

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += 'Error ' + error.message;
  }
}
