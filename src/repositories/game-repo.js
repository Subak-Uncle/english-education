const GameQuery = require("../database/game-query");

exports.registGame = (connection, gameName) => {
  return new Promise((resolve, reject) => {
    connection.query(GameQuery.registGame(), [gameName], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.findAllGames = (connection, gameName) => {
  return new Promise((resolve, reject) => {
    connection.query(GameQuery.findAllGames(), (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.findGameByGameNo = (connection, gameNo) => {
  return new Promise((resolve, reject) => {
    connection.query(GameQuery.findGameByGameNo(), [gameNo], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.getGameNoAtquestion = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(GameQuery.getGameNoAtquestion(), (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
