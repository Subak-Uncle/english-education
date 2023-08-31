const GameService = require("../services/game-service");
const QuestionService = require("../services/question-service");
const HttpStatus = require("http-status");

exports.registGame = async (req, res, next) => {
  const result = await GameService.registGame(req.body.gameName);
  const gameNo = result[0].game_no;
  if (result) {
    let index = 1;
    const response = await QuestionService.getQuestionByQuestionNo(index);
    const questionNo = response[0].question_no;
    const questionContent = response[0].question_content;
    const prompt = response[0].prompt;
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      result: { gameNo, questionNo, questionContent, prompt },
      contentLocation: `/question/${response.questionNo}`,
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "등록에 실패하였습니다.",
      code: -1234,
      result: [],
      links: [
        {
          rel: "registGame",
          method: "POST",
          href: "/game",
        },
      ],
    });
  }
};

exports.findAllGames = async (req, res, next) => {
  const result = await GameService.findAllGames();
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
      message: "조회에 실패하였습니다.",
      code: -1234,
      result: [],
      links: [
        {
          rel: "findAllGames",
          method: "GET",
          href: "/game",
        },
      ],
    });
  }
};

exports.findGameByGameNo = async (req, res, next) => {
  const result = await GameService.findGameByGameNo(req.params.gameNo);
  if (result && result.length > 0) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      result: result,
    });
  }
  if (result && result.length === 0) {
    res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: "조회에 실패하였습니다.",
      code: -1234,
      result: [],
      links: [
        {
          rel: "findGameByGameNo",
          method: "GET",
          href: `/game/${req.params.gameNo}`,
        },
      ],
    });
  }
};
