import parseArgs from './parseArgs';

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
  const result = parseArgs(process.argv);

  if ('height' in result && 'weight' in result) {
    const { height, weight } = result;

    console.log(calculateBmi(height, weight));
  } else {
    throw new Error ('Given arguments were incorrect!');
  }
} catch (error: unknown) {
  let errorMessage;
  errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage = `${errorMessage} Error ${error.message}`;
    throw new Error(errorMessage);
  }
  throw new Error(errorMessage);
}