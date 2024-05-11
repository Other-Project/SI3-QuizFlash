const { Router, request } = require("express");


const { buildUserStats, getSuccessRatePerTry, getTimePerQuestion, getSuccessRatePerQuestion, getTimePerTry } = require("./manager");
const logger = require("../../utils/logger");

const router = new Router();

router.get("/:userId", (req, res) => {
    try {
        res.status(200).json(buildUserStats(req.params.userId));
    } catch (err) {
        logger.log("User stats error", err);
    }
});

router.get("/success/:statType/:patientId/:quizId?/:questionType?", (req, res) => {
    const { statType, patientId, quizId, questionType } = req.params;
    console.log("questionType1", questionType);
    try {
        let data;
        switch (statType) {
            case "try":
                data = getSuccessRatePerTry(patientId, quizId, questionType);
                break;
            case "question":
                data = getSuccessRatePerQuestion(patientId, quizId, questionType);
                break;
        }
        res.status(200).json(data);
    } catch (err) {
        logger.log("Error", err);
    }
});


router.get("/time/:statType/:patientId/:quizId?/:questionType?", (req, res) => {
    const { statType, patientId, quizId, questionType } = req.params;
    console.log("questionType1", questionType);
    try {
        let data;
        switch (statType) {
            case "try":
                data = getTimePerTry(patientId, quizId, questionType);
                break;
            case "question":
                data = getTimePerQuestion(patientId, quizId, questionType);
                break;
        }
        res.status(200).json(data);
    } catch (err) {
        logger.log("Error", err);
    }
});

module.exports = router;