const QuestionService = require("../services/question-service");
const GameService = require("../services/game-service");
const HttpStatus = require("http-status");

exports.getQuestionByQuestionNo = async (req, res, next) => {
  const result = await QuestionService.getQuestionByQuestionNo(
    req.params.questionNo
  );
  const gameNoList = await GameService.getGameNoAtquestion();
  const gameNo = gameNoList[0].gameNo;
  const questionNo = result[0].question_no;
  const questionContent = result[0].question_content;
  const prompt = result[0].prompt;
  if (result) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: "성공적으로 조회되었습니다.",
      result: {
        questionNo,
        questionContent,
        prompt,
        gameNo,
      },
      contentLocation: `/question/${res.questionNo}`,
    });
  } else {
    res.status(HttpStatus.Bad_REQUEST).send({
      status: HttpStatus.Bad_REQUEST,
      message: "존재하지 않는 질문입니다.",
      code: -1234,
      result: [],
      links: [
        {
          rel: "getQuestionByQuestionNo",
          method: "GET",
          href: `/question/${req.params.questionNo}`,
        },
      ],
    });
  }
};
