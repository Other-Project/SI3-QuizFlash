const { Router } = require("express");
const { Answer } = require("../../../../models");

const { getQuestionFromQuiz } = require("../manager");
const { getQuestionAnswers, getAnswerFromQuestion } = require("./manager");
const { catchErrors } = require("../../../../utils/errors/routes");

const router = new Router({ mergeParams: true });

router.get("/", (req, res) => catchErrors(req, res, () => {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    const answers = getQuestionAnswers(question.id);
    res.status(200).json(answers);
}));

router.get("/:answerId", (req, res) => catchErrors(req, res, () => {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId);
    res.status(200).json(answer);
}));

router.post("/", (req, res) => catchErrors(req, res, () => {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId);
    const answer = Answer.create({ ...req.body, questionId: question.id });
    res.status(201).json(answer);
}));

router.put("/:answerId", (req, res) => catchErrors(req, res, () => {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId);
    const updatedAnswer = Answer.update(req.params.answerId, { ...req.body, questionId: answer.questionId });
    res.status(200).json(updatedAnswer);
}));

router.delete("/:answerId", (req, res) => catchErrors(req, res, () => {
    getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId);
    Answer.delete(req.params.answerId);
    res.status(204).end();
}));

module.exports = router;