const express = require("express");
const router = express.Router();
const AnswerController = require("../controllers/answer-controller");

router.get("/:gameNo", AnswerController.getResult);
router.post("/", AnswerController.getGPTAnswer);

module.exports = router;
