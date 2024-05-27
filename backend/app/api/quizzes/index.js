const { Router } = require("express");

const { Quiz, QuestionStats } = require("../../models");
const { catchErrors } = require("../../utils/errors/routes");
const QuestionsRouter = require("./questions");
const { buildQuiz, updateQuiz, replaceQuiz, createQuiz, deleteQuiz, createStatQuiz, createStatQuestion } = require("./manager");

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

    res.status(200).json(buildQuiz(req.params.quizId, ""));
}));

//TODO remove userID
router.get("/:quizId/:userId/startQuiz", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Create the Statistics'
        #swagger.responses[200] = {
            schema: [quiz : { $ref: '#/definitions/Quiz'} , quizStatId : { $ref: '#/definitions/QuizStats'}]
        }
        #swagger.responses[404] = {
            description: 'No quiz found with this id'
        } */

    res.status(200).json({
        quiz: buildQuiz(req.params.quizId, req.params.userId),
        quizStatId: createStatQuiz(req.params.quizId, parseInt(req.params.userId), Date.now())
    });
}));

router.get("/:quizStatId/:questionId/nextQuestion", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Create the Statistics'
        #swagger.responses[200] = {
            schema: [quiz : { $ref: '#/definitions/Quiz'} , quizStatId : { $ref: '#/definitions/QuizStats'}]
        }
        #swagger.responses[404] = {
            description: 'No quiz found with this id'
        } */
    res.status(200).json(createStatQuestion(req.params.quizStatId, req.params.questionId));
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