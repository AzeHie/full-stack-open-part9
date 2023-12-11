import parseArgs from './parseArgs';

interface results {
  periodLength: number;
  trainingDays: number;
  target: number;
  averageTime: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  dailyExercises: number[],
  target: number
): results => {
  const trainingDays = dailyExercises.filter((e) => e > 0).length;

  const trainingHours: number = dailyExercises.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  const averageTime = trainingHours / dailyExercises.length;

  const success = averageTime > target ? true : false;

  let rating: number;
  let ratingDescription: string;

  if (averageTime < target * 0.5) {
    rating = 1;
    ratingDescription = 'You suck!';
  } else if (averageTime > target * 0.5 && averageTime < target) {
    rating = 2;
    ratingDescription = 'Pretty good, but could be better';
  } else {
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
  };
};

try {
  // instead of numbers, we expect array of numbers as argument for dailyExercises (eg. "[1, 2, 3, 4]", instead of 1 2 3 4).
  const result = parseArgs(process.argv);

  if ('dailyExercises' in result && 'target' in result) {
    const { dailyExercises, target } = result;
    console.log(calculateExercises(dailyExercises, target));
  } else {
    throw new Error ('Given arguments were not correct!');
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
