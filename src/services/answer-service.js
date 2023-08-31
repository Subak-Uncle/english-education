const getConnection = require("../database/connection");
const AnswerRepository = require("../repositories/answer-repo");

exports.checkValidAnswer = (answer) => {
  return new Promise((resolve, reject) => {
    if (answer.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/)) {
      reject(new Error("영어로 답변해주세요."));
    }
    if (answer.length < 1 || answer.trim().length === 0) {
      reject(new Error("답변을 입력해주세요."));
    }
    resolve(answer);
  });
};

exports.registAnswer = (answerDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();

    try {
      const result = await AnswerRepository.registAnswer(connection, answerDTO);

      const insertedAnswer = await AnswerRepository.findAnswerByAnswerNo(
        connection,
        result.insertId
      );
      connection.commit();
      resolve(insertedAnswer);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.findAnswerByAnswerNo = (answerNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const answer = await AnswerRepository.findAnswerByAnswerNo(
        connection,
        answerNo
      );
      resolve(answer);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.getResult = (gameNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const answerList = await AnswerRepository.findAnswerListByGameNo(
        connection,
        gameNo
      );
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};
