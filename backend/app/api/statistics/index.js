const { Router } = require("express");


const { buildUserStats, getRequestedStat, getTime, getSuccessRate, getAnswerHintRate } = require("./manager");
const { catchErrors } = require("../../utils/errors/routes");

const router = new Router();

router.get("/history/:userId", (req, res) => catchErrors(req, res, () => {
    res.status(200).json(buildUserStats(req.params.userId));
}));

router.get("/", (req, res) => catchErrors(req, res, () => {
    const { dataType, statFilter, userId, quizId, questionType } = req.query;
    res.status(200).json(getRequestedStat(dataType, statFilter, userId, quizId, questionType));
}));

router.get("/time-data", (req, res) => catchErrors(req, res, () => {
    const { userId, quizId, questionType } = req.query;
    res.status(200).json(getTime(userId, quizId, questionType));
}));

router.get("/success-rate", (req, res) => catchErrors(req, res, () => {
    const { userId, quizId, questionType } = req.query;
    res.status(200).json(getSuccessRate(userId, quizId, questionType));
}));

router.get("/answer-hint-rate", (req, res) => catchErrors(req, res, () => {
    const { userId, quizId, questionType } = req.query;
    res.status(200).json(getAnswerHintRate(userId, quizId, questionType));
}));

module.exports = router;