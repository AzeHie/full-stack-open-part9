const calculateWebBmi = (height: number, weight: number) => {
  const bmi = (weight / (height * height)) * 10000;

  if (bmi > 29.9) {
    return 'Obese';
  } else if (bmi > 24.9 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Normal, healthy weight';
  }
};

export default calculateWebBmi;
