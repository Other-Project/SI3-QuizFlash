const { Router } = require("express");

const { Quiz } = require("../../models");
const { catchErrors } = require("../../utils/errors/routes");
const QuestionsRouter = require("./questions");
const { buildQuiz, updateQuiz, replaceQuiz, createQuiz, deleteQuiz, createStatQuiz, createStatQuestion, checkAnswer } = require("./manager");
const checkAuthentication = require("../../utils/auth-checker");
const access = require("../../models/access-restriction.model");
const { readFile } = require("../../utils/file");

const router = new Router();

router.use("/:quizId/questions", QuestionsRouter);

router.get("/", checkAuthentication(access.user), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Get all quizzes'
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/Quiz' }]
        } */

    res.status(200).json(Quiz.get().map(quiz => ({ ...quiz, thumbnailUrl: readFile(quiz.thumbnailUrl) })));
}));

router.get("/:quizId", checkAuthentication(access.user), (req, res) => catchErrors(req, res, () => {
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

router.get("/:quizId/startQuiz", checkAuthentication(access.user), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Return a quiz without trueAnswer parameter inside answers and the id of the QuizStats object created'
        #swagger.responses[200] = {
            schema:{
                quiz : { $ref: '#/definitions/Quiz' },
                quizStatId : ''
            }
        }
        #swagger.responses[404] = {
            description: 'No quiz found with this id or no user found with this id'
        } */

    res.status(200).json({
        quiz: buildQuiz(req.params.quizId, req.user.id),
        quizStatId: createStatQuiz(req.params.quizId, req.user.id)
    });
}));

router.get("/:quizStatId/:questionId/createQuestionStat", checkAuthentication(access.user), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Create a QuestionStat and return its id'
        #swagger.responses[200] = {
                schema : 1
            }
        #swagger.responses[404] = {
            description: 'No question found with this id or no quiStat found with this id'
        } */
    res.status(200).json(createStatQuestion(req.params.quizStatId, req.params.questionId));
}));

router.post("/:quizStatId/:questionStatId/checkAnswer", checkAuthentication(access.user), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Quizzes']
        #swagger.summary = 'Checks if the given proposition is the correct answer'
        #swagger.responses[200] = {
            schema:{
                isTrue : true,
                expected : {
                    id : 1,
                    text : " "
                    }
            }
        }
        #swagger.responses[404] = {
            description: 'No questionStat found with this id'
        } */
    res.status(200).json(checkAnswer(req.params.quizStatId, req.params.questionStatId, req.body, req.user.id));
}));


router.post("/", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
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

router.put("/:quizId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
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

router.patch("/:quizId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
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

router.delete("/:quizId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
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