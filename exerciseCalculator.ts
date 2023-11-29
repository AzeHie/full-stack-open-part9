interface results {
  periodLength: number,
  trainingDays: number,
  target: number,
  averageTime: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

const calculateExercises = (dailyExercises: number[], target: number): results => {
  const trainingDays = dailyExercises.filter(e => e > 0).length;

  const trainingHours: number = dailyExercises.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const averageTime = trainingHours / dailyExercises.length;

  const success = averageTime < target ? true : false;

  let rating: number;
  let ratingDescription: string;

  if (averageTime < target * 0.5) {
    rating = 1;
    ratingDescription = 'You suck!'
  } 
  else if (averageTime > target * 0.5 && averageTime < target) {
    rating = 2;
    ratingDescription = 'Pretty good, but could be better'
  }
  else {
    rating = 3;
    ratingDescription = 'Absolutely perfect!!';
  }

  return {
    periodLength: dailyExercises.length,
    trainingDays: trainingDays,
    target: target,
    averageTime: averageTime,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
  }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
