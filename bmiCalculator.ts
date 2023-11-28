const calculateBmi = (weight: number, height: number) => {
 const squaredHeight = height * height;
 const bmi = weight / squaredHeight;

 if (bmi > 29.9) {
  return 'Obese'
 }
 else if (bmi > 24.9 && bmi < 30) {
  return 'Overweight'
 }
 else {
  return 'Normal, healthy weight'
 }
};

console.log(calculateBmi(180, 74));