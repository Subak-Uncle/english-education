const getConnection = require("../database/connection");
const QuestionRepository = require("../repositories/question-repo");

exports.getQuestionByQuestionNo = (questionNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();

    try {
      const result = await QuestionRepository.getQuestionByQuestionNo(
        connection,
        questionNo
      );
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};
