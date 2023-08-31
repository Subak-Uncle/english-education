class MidnightDTO {
  gameNo;
  content;
  score;
  question;

  constructor(conversation) {
    this.gameNo = conversation.gameNo;
    this.content = conversation.content;
    this.score = conversation.score;
    this.question = conversation.question;
  }
}

module.exports = MidnightDTO;
