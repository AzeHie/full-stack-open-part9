const parseArgs = (args: String[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(process.argv[2]),
      weight: Number(process.argv[3]),
    };
  } else if (isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    const dailyExercises: number[] = JSON.parse(args[2] as string);
    if (args[2].length < 1) throw new Error('There must be atleast one daily exercise done');
    if (!dailyExercises.every((e) => typeof e === 'number'))  throw new Error('Daily exercises must be numbers')

    return {
      dailyExercises: dailyExercises,
      target: Number(args[3])
    }
  } 
  else {
    throw new Error('Provided values were not correct!');
  }
};

export default parseArgs;