const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/question-controller");

router.get("/:questionNo", QuestionController.getQuestionByQuestionNo);
router.post("/");

module.exports = router;
