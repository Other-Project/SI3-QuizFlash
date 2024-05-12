const { Router } = require("express");


const { buildUserStats, getRequestedStat } = require("./manager");
const { catchErrors } = require("../../utils/errors/routes");

const router = new Router();

router.get("/:userId", (req, res) => catchErrors(req, res, () => {
    res.status(200).json(buildUserStats(req.params.userId));
}));

router.get("/:dataType/:statType/:patientId/:quizId?/:questionType?", (req, res) => catchErrors(req, res, () => {
    const { dataType, statType, patientId, quizId, questionType } = req.params;
    res.status(200).json(getRequestedStat(dataType, statType, patientId, quizId, questionType));
}));

module.exports = router;