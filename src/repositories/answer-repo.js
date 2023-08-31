const AnswerQuery = require("../database/answer-query");

exports.registAnswer = (connection, answerDTO) => {
  return new Promise((resolve, reject) => {
    connection.query(
      AnswerQuery.registAnswer(),
      [
        answerDTO.gameNo,
        answerDTO.questionNo,
        answerDTO.answerContent,
        answerDTO.answerScore,
        answerDTO.modelAnswer,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(result);
        resolve(result);
      }
    );
  });
};

exports.findAnswerByAnswerNo = (connection, answerNo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      AnswerQuery.findAnswerByAnswerNo(),
      [answerNo],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
