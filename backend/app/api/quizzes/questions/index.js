const { Router } = require("express");

const { Answer, Quiz, Question } = require("../../../models");
const { catchErrors } = require("../../../utils/errors/routes");
const AnswersRouter = require("./answers");
const { getQuizQuestions, getQuestionFromQuiz } = require("./manager");

const router = new Router({ mergeParams: true });

router.get("/", (req, res) => catchErrors(req, res, () => {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId);
    res.status(200).json(getQuizQuestions(req.params.quizId));
}));

router.get("/:questionId", (req, res) => catchErrors(req, res, () => {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    res.status(200).json(question);
}));

router.post("/", (req, res) => catchErrors(req, res, () => {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId);
    const quizId = parseInt(req.params.quizId, 10);
    let question = Question.create({ label: req.body.label, quizId });
    // If answers have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
        const answers = req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }));
        question = { ...question, answers };
    }
    res.status(201).json(question);
}));

router.put("/:questionId", (req, res) => catchErrors(req, res, () => {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    const updatedQuestion = Question.update(req.params.questionId, { label: req.body.label, quizId: question.quizId });
    res.status(200).json(updatedQuestion);
}));

router.delete("/:questionId", (req, res) => catchErrors(req, res, () => {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    Question.delete(req.params.questionId);
    res.status(204).end();
}));

router.use("/:questionId/answers", AnswersRouter);

module.exports = router;