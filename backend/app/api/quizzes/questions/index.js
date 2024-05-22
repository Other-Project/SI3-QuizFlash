const { Router } = require("express");

const { Answer, Quiz, Question } = require("../../../models");
const { catchErrors } = require("../../../utils/errors/routes");
const AnswersRouter = require("./answers");
const {getQuizQuestions, getQuestionFromQuiz, createQuestion, deleteQuestion, replaceQuestion, updateQuestion} = require("./manager");

const router = new Router({ mergeParams: true });

router.get("/", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Questions']
        #swagger.summary = 'Get all questions'
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/Question' }]
        } */

    Quiz.getById(req.params.quizId);
    res.status(200).json(getQuizQuestions(req.params.quizId));
}));

router.get("/:questionId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Questions']
        #swagger.summary = 'Get a specific question'
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/Question' }]
        }
        #swagger.responses[404] = {
            description: 'Ids don't match'
        } */

    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    res.status(200).json(question);
}));

router.post("/", (req, res) => catchErrors(req, res, () => {
    /*   #swagger.tags = ['Questions']
         #swagger.summary = 'Add new question'
         #swagger.parameters['body'] = {
             in: 'body',
             schema: { $ref: '#/definitions/Question' }
         }
         #swagger.responses[201] = {
             schema: { $ref: '#/definitions/Question' }
         }
         #swagger.responses[400] = {
             description: 'Invalid request'
         } */

    Quiz.getById(req.params.quizId);
    const quizId = parseInt(req.params.quizId, 10);
    res.status(201).json(createQuestion(quizId, req.body));
}));

router.put("/:questionId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Questions']
        #swagger.summary = 'Modify an existing question'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Question' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Question' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: 'Ids don't match'
        } */

    res.status(200).json(replaceQuestion(req.params.quizId, req.body));
}));

router.patch("/:questionId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Questions']
        #swagger.summary = 'Modify parts of an existing question'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Question' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Question' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: 'Ids don't match'
        } */

    res.status(200).json(updateQuestion(req.params.quizId, req.body));
}));

router.delete("/:questionId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Questions']
        #swagger.summary = 'Delete a question'
        #swagger.responses[204] = { }
        #swagger.responses[404] = {
            description: 'Ids don't match'
        } */

    deleteQuestion(req.params.questionId);
    res.status(204).end();
}));

router.use("/:questionId/answers", AnswersRouter);

module.exports = router;