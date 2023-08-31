const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game-controller");

router.get("/", GameController.findAllGames);
router.get("/:gameNo", GameController.findGameByGameNo);
router.post("/", GameController.registGame);

module.exports = router;
