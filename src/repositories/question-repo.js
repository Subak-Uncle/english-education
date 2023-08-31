const QuestionQuery = require("../database/question-query");

exports.getQuestionByQuestionNo = (connection, questionNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      QuestionQuery.getQuestionByQuestionNo(),
      [questionNo],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
