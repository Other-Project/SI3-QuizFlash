const { Router } = require("express");


const { buildUserStats, getRequestedStat, getTimeData, getSuccessRate, getAnswerHintRate } = require("./manager");
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

router.get("/", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get specific user statistics'
    #swagger.parameters['userId'] = {
        in: 'query',
        description: 'The user id',
        required: true,
        schema: {
            type: 'string'
        }
    }
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
        schema: {
            type: 'array',
            items: []
        }
    }
    #swagger.responses[400] = {
        description: 'Invalid request'
    } */
    const { dataType, statFilter, userId, quizId, questionType } = req.query;
    res.status(200).json(getRequestedStat(dataType, statFilter, userId, quizId, questionType));
}));

router.get("/time-data", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get user time data'
    #swagger.parameters['userId'] = {
        in: 'query',
        description: 'The user id',
        required: true,
        schema: {
            type: 'string'
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
        schema: {
            type: 'array',
            items: []
        }
    }
    #swagger.responses[400] = {
        description: 'Invalid request'
    } */
    const { userId, quizId, questionType } = req.query;
    res.status(200).json(getTimeData(userId, quizId, questionType));
}));

router.get("/success-rate", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get user success rate'
    #swagger.parameters['userId'] = {
        in: 'query',
        description: 'The user id',
        required: true,
        schema: {
            type: 'string'
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
        schema: {
            type: 'number'
        }
    }
    #swagger.responses[400] = {
        description: 'Invalid request'
    } */
    const { userId, quizId, questionType } = req.query;
    res.status(200).json(getSuccessRate(userId, quizId, questionType));
}));

router.get("/answer-hint-rate", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Statistics']
    #swagger.summary = 'Get user answer hint rate'
    #swagger.parameters['userId'] = {
        in: 'query',
        description: 'The user id',
        required: true,
        schema: {
            type: 'string'
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
        schema: {
            type: 'number'
        }
    }
    #swagger.responses[400] = {
        description: 'Invalid request'
    } */
    const { userId, quizId, questionType } = req.query;
    res.status(200).json(getAnswerHintRate(userId, quizId, questionType));
}));

module.exports = router;