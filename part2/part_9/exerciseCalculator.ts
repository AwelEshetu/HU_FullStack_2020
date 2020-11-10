interface Stat {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface Args {
  target: number;
  dailyHours: Array<number>;
}

const getArguments = (args: Array<string>): Args => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (args.slice(2).every((arg) => !isNaN(Number(arg)))) {
    return {
      target: Number(args[2]),
      dailyHours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  target: number,
  dailyHours: Array<number>
): Stat => {
  let aver, rate, rateDescrip;
  if (dailyHours.length > 0) {
    aver = dailyHours.reduce((a, b) => a + b) / dailyHours.length;
    rate = aver <= target / 2 ? 1 : aver > target / 2 && aver <= target ? 2 : 3;
    rateDescrip =
      rate === 1
        ? "bad, must work harder"
        : 2
        ? "not too bad but could be better"
        : "good , keep it up";
  } else {
    throw new Error("You have not worked out at all!");
  }
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((hour) => hour > 0).length,
    success: aver > target,
    rating: rate,
    ratingDescription: rateDescrip,
    target: target,
    average: aver,
  };
};

try {
  const { target, dailyHours } = getArguments(process.argv);
  console.log(calculateExercises(target, dailyHours));
} catch (e) {
  console.log("Something went wrong, error message: ", e.message);
}
