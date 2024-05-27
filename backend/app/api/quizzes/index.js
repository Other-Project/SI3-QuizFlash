const { Router } = require("express");

const {Quiz} = require("../../models");
const { catchErrors } = require("../../utils/errors/routes");
const QuestionsRouter = require("./questions");
const {buildQuiz, updateQuiz, replaceQuiz, createQuiz, deleteQuiz} = require("./manager");

const router = new Router();

router.use("/:quizId/questions", QuestionsRouter);

router.get("/", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Get all quizzes'
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/Quiz' }]
        } */

    res.status(200).json(Quiz.get());
}));

router.get("/:quizId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Get a specific quiz'
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/Quiz' }]
        }
        #swagger.responses[404] = {
            description: 'No quiz found with this id'
        } */

    res.status(200).json(buildQuiz(req.params.quizId));
}));

router.post("/", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Add new quiz'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Quiz' }
        }
        #swagger.responses[201] = {
            schema: { $ref: '#/definitions/Quiz' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        } */

    res.status(201).json(createQuiz(req.body));
}));

router.put("/:quizId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Modify an existing quiz'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Quiz' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Quiz' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: 'No quiz found with this id'
        } */

    res.status(200).json(replaceQuiz(req.params.quizId, req.body));
}));

router.patch("/:quizId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Modify parts of an existing quiz'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Quiz' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Quiz' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: 'No quiz found with this id'
        } */

    res.status(200).json(updateQuiz(req.params.quizId, req.body));
}));

router.delete("/:quizId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Delete a quiz'
        #swagger.responses[204] = { }
        #swagger.responses[404] = {
            description: 'No quiz found with this id'
        } */

    deleteQuiz(req.params.quizId);
    res.status(204).end();
}));

module.exports = router;