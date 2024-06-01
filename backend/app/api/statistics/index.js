const { Router } = require("express");


const { buildUserStats, getRequestedStat, getUserQuizzesParticipation } = require("./manager");
const { catchErrors } = require("../../utils/errors/routes");
const router = new Router();

router.get("/history/:userId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get user history'
    #swagger.responses[200] = {
        schema: [{ $ref: '#/definitions/QuizStats' }]
    } */
    res.status(200).json(buildUserStats(req.params.userId));
}));

router.get("/:userId/:dataType/:statType", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get specific user statistics'
    #swagger.parameters['quizId'] = {
        in: 'query',
        schema: {
            type: 'string'
        }
    }
    #swagger.parameters['questionType'] = {
        in: 'query',
        schema: {
            type: 'string',
            enum: ['TextOnly','Image','Sound']
        }
    }
    #swagger.responses[200] = {
        schema: [
            { $ref: "#/definitions/SuccessStats" }
        ]
    }
    #swagger.responses[400] = {
        description: 'Invalid request'
    } */
    const { userId, dataType, statType } = req.params;
    const { quizId, questionType } = req.query;
    res.status(200).json(getRequestedStat(dataType, statType, userId, quizId, questionType));
}));

router.get("/quizzes/:userId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get user participation'
    #swagger.responses[200] = {
        schema: [{ $ref: '#/definitions/UserParticipation' }]
    } */
    res.status(200).json(getUserQuizzesParticipation(req.params.userId));
}));

module.exports = router;