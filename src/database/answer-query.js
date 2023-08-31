exports.registAnswer = () => {
  return `
        INSERT
          INTO TBL_ANSWER
          (game_no, question_no, answer_content, answer_score, model_answer)
        VALUES
         (?, ?, ?, ?, ?)
    `;
};

exports.findAnswerByAnswerNo = () => {
  return `
        SELECT *
          FROM TBL_ANSWER
         WHERE answer_no =?
    `;
};
