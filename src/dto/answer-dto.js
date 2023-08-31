class AnswerDTO {
  gameNo;
  questionNo;
  answerContent;
  answerScore;
  modelAnswer;

  constructor(request, score, modelAnswer) {
    this.gameNo = request.gameNo;
    this.questionNo = request.questionNo;
    this.answerContent = request.answer;
    this.answerScore = score;
    this.modelAnswer = modelAnswer;
  }
}

module.exports = AnswerDTO;
