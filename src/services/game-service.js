const getConnection = require("../database/connection");
const GameRepository = require("../repositories/game-repo");

exports.registGame = (gameName) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();

    try {
      const result = await GameRepository.registGame(connection, gameName);

      const insertedGame = await GameRepository.findGameByGameNo(
        connection,
        result.insertId
      );

      connection.commit();
      resolve(insertedGame);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.findAllGames = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await GameRepository.findAllGames(connection);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.findGameByGameNo = (gameNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await GameRepository.findGameByGameNo(connection, gameNo);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.getGameNoAtquestion = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await GameRepository.getGameNoAtquestion(connection);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};
