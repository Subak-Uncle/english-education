const express = require("express");
const logger = require("morgan");
const gameRouter = require("./src/routes/game-route");
const answerRouter = require("./src/routes/answer-route");
const questionRouter = require("./src/routes/question-route");

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use("/game", gameRouter);
app.use("/answer", answerRouter);
app.use("/question", questionRouter);

app.listen(9200, () => console.log("Listening on port 9200"));
