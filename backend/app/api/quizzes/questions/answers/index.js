const { Router } = require("express");
const { Answer } = require("../../../../models");

const { getQuestionFromQuiz } = require("../manager");
const { getQuestionAnswers, getAnswerFromQuestion } = require("./manager");
const { catchErrors } = require("../../../../utils/errors/routes");
const checkAuthentication = require("../../../../utils/auth-checker");
const access = require("../../../../models/access-restriction.model");

const router = new Router({ mergeParams: true });

router.get("/", checkAuthentication(access.user), (req, res) => catchErrors(req, res, () => {
    /* #swagger.tags = ['Answers']
       #swagger.summary = 'Get all answers'
       #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/Answer' }]
       } */

    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    const answers = getQuestionAnswers(question.id);
    res.status(200).json(answers);
}));

router.get("/:answerId", checkAuthentication(access.user), (req, res) => catchErrors(req, res, () => {
    /* #swagger.tags = ['Answers']
       #swagger.summary = 'Get a specific answers'
       #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/Answer' }]
       }
       #swagger.responses[404] = {
            description: "Ids don't match"
       } */

    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId);
    res.status(200).json(answer);
}));

router.post("/", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /* #swagger.tags = ['Answers']
       #swagger.summary = 'Add new answer'
       #swagger.parameters['body'] = {
           in: 'body',
           schema: { $ref: '#/definitions/Answer' }
       }
       #swagger.responses[201] = {
           schema: { $ref: '#/definitions/Answer' }
       }
       #swagger.responses[400] = {
           description: 'Invalid request'
       } */

    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    const answer = Answer.create({ ...req.body, questionId: question.id });
    res.status(201).json(answer);
}));

router.put("/:answerId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Answers']
        #swagger.summary = 'Modify an existing answer'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Answer' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Answer' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: "Ids don't match"
        } */

    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId);
    const updatedAnswer = Answer.replace(req.params.answerId, {...req.body, questionId: answer.questionId});
    res.status(200).json(updatedAnswer);
}));

router.patch("/:answerId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Answers']
        #swagger.summary = 'Modify parts of an existing answer'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Answer' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Answer' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: "Ids don't match"
        } */

    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId);
    const updatedAnswer = Answer.update(req.params.answerId, {...req.body, questionId: answer.questionId});
    res.status(200).json(updatedAnswer);
}));

router.delete("/:answerId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /* #swagger.tags = ['Answers']
       #swagger.summary = 'Delete an answer'
       #swagger.responses[204] = { }
       #swagger.responses[404] = {
            description: "Ids don't match"
       } */

    getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId);
    Answer.delete(req.params.answerId);
    res.status(204).end();
}));

module.exports = router;