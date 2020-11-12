import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, Args, Stat } from "./exerciseCalculator";
const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height),
    weight = Number(req.query.weight);
  const result = {
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  };
  if (!!height && !!weight && res.statusCode === 200) {
    res.send(result);
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});
app.post("/exercises", (req, res) => {
  const body = req.body as Args;
  const result: Stat = calculateExercises(body.target, body.daily_exercises);
  if (res.statusCode === 200) {
    res.send(result);
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
