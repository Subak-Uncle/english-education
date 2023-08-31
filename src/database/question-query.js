exports.getQuestionByQuestionNo = () => {
  return `
        SELECT *
          FROM TBL_QUESTION
         WHERE question_no = 
         (?)
    `;
};
