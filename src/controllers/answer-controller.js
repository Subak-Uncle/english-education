const { OpenAI } = require("openai");
const AnswerService = require("../services/answer-service");
const HttpStatus = require("http-status");
const axios = require("axios");
const AnswerDTO = require("../dto/answer-dto");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getGPTAnswer = async (req, res) => {
  console.log("request 입니다 : ", req.body);
  try {
    const prompt = req.body.prompt;
    let facialLabel;
    let facialScore;
    const result = await AnswerService.checkValidAnswer(req.body.answer);
    const url = "http://172.16.17.120:8081/sent";
    await axios
      .post(url, {
        sentence: JSON.stringify(req.body.answer),
      })
      .then((res) => {
        facialLabel = res.data.label;
        facialScore = res.data.score;
      });
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "assistant", content: prompt },
        { role: "assistant", content: req.body.questionContent },
        { role: "user", content: req.body.answer },
      ],
      model: "gpt-4",
    });

    const json = JSON.parse(completion.choices[0].message.content);
    const modelAnswer = json.modelAnswer;
    const score = json.score;

    const response = await AnswerService.registAnswer(
      new AnswerDTO(req.body, score, modelAnswer)
    );
    const answerNo = response[0].answer_no;
    const gameNo = response[0].game_no;
    const questionNo = response[0].question_no;
    const answerContent = response[0].answer_content;
    if (response) {
      res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: "성공적으로 등록되었습니다.",
        result: {
          facialLabel,
          facialScore,
          answerNo,
          gameNo,
          questionNo,
          answerContent,
          answerScore: score,
          modelAnswer,
        },
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "등록할 수 없습니다.",
        code: -1234,
        result: [],
        link: [
          {
            rel: "registAnswer",
            method: "POST",
            href: "/answer",
          },
        ],
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
      code: -1234,
      result: {
        modelAnswer: error.message,
      },
      link: [
        {
          rel: "registAnswer",
          method: "POST",
          href: "/answer",
        },
      ],
    });
  }
};

exports.getResult = async (req, res) => {
  const result = await AnswerService.getGPTAnswer(req.params.gameNo);
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      result: result,
    });
  }
  if (!result) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "조회할 수 없습니다.",
      code: -1234,
      result: [],
      link: [
        {
          rel: "getResult",
          method: "GET",
          href: "/answer",
        },
      ],
    });
  }
};
