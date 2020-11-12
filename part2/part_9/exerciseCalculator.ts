export interface Stat {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export interface Args {
  target: number;
  daily_exercises: Array<number>;
}

const getArguments = (args: Array<string>): Args => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (args.slice(2).every((arg) => !isNaN(Number(arg)))) {
    return {
      target: Number(args[2]),
      daily_exercises: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  target: number,
  daily_exercises: Array<number>
): Stat => {
  let aver, rate, rateDescrip;
  if (daily_exercises.length > 0) {
    aver = daily_exercises.reduce((a, b) => a + b) / daily_exercises.length;
    rate = aver <= target / 2 ? 1 : aver > target / 2 && aver <= target ? 2 : 3;
    rateDescrip =
      rate === 1
        ? "bad, must work harder"
        : // eslint-disable-next-line no-constant-condition
        2
        ? "not too bad but could be better"
        : "good , keep it up";
  } else {
    throw new Error("You have not worked out at all!");
  }
  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((hour) => hour > 0).length,
    success: aver > target,
    rating: rate,
    ratingDescription: rateDescrip,
    target: target,
    average: aver,
  };
};

try {
  const { target, daily_exercises } = getArguments(process.argv);
  console.log(calculateExercises(target, daily_exercises));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Something went wrong, error message: ", e.message);
}
