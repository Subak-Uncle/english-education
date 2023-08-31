exports.registGame = () => {
  return `
        INSERT
          INTO TBL_GAME
          (game_name)
        VALUES 
          (?)
    `;
};

exports.findAllGames = () => {
  return `
    SELECT *
      FROM TBL_GAME
      order by game_no ASC
    `;
};

exports.findGameByGameNo = () => {
  return `
        SELECT *
          FROM TBL_GAME
         WHERE game_no =?
    `;
};

exports.getGameNoAtquestion = () => {
  return `
        SELECT Max(game_no) as gameNo
          FROM TBL_GAME
    `;
};
