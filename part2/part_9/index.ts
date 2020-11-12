import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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
    res.json(result);
  } else {
    res.json({
      error: "malformatted parameters",
    });
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
