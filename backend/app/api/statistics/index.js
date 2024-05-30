const { Router } = require("express");


const { buildUserStats, getRequestedStat } = require("./manager");
const { catchErrors } = require("../../utils/errors/routes");

const router = new Router();

router.get("/history/:userId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get user history'
    #swagger.responses[200] = {
        schema: [{ $ref: '#/definitions/QuizStats' }]
    } */
    res.status(200).json(buildUserStats(req.params.userId, undefined, undefined));
}));

router.get("/:userId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get specific user statistics'
    #swagger.parameters['dataType'] = {
        in: 'query',
        description: 'The type of data requested',
        required: true,
        schema: {
            type: 'string',
            enum: ['success','time']
        }
    }
    #swagger.parameters['statType'] = {
        in: 'query',
        description: 'The type of stat requested',
        required: true,
        schema: {
            type: 'string',
            enum: ['try','question']
        }
    }
    #swagger.parameters['quizId'] = {
        in: 'query',
        description: 'The quiz id',
        schema: {
            type: 'string'
        }
    }
    #swagger.parameters['questionType'] = {
        in: 'query',
        description: 'The question type',
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
    const { dataType, statType, quizId, questionType } = req.query;
    res.status(200).json(getRequestedStat(dataType, statType, req.params.userId, quizId, questionType));
}));

module.exports = router;