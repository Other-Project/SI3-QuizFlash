const { Router } = require("express");

const { Quiz } = require("../../models");
const { catchErrors } = require("../../utils/errors/routes");
const QuestionsRouter = require("./questions");
const { buildQuiz, buildQuizzes } = require("./manager");

const router = new Router();

router.use("/:quizId/questions", QuestionsRouter);

router.get("/", (req, res) => catchErrors(req, res, () => {
    res.status(200).json(buildQuizzes());
}));

router.get("/:quizId", (req, res) => catchErrors(req, res, () => {
    res.status(200).json(buildQuiz(req.params.quizId));
}));

router.post("/", (req, res) => catchErrors(req, res, () => {
    res.status(201).json(Quiz.create({ ...req.body }));
}));

router.put("/:quizId", (req, res) => catchErrors(req, res, () => {
    res.status(200).json(Quiz.update(req.params.quizId, req.body));
}));

router.delete("/:quizId", (req, res) => catchErrors(req, res, () => {
    Quiz.delete(req.params.quizId);
    res.status(204).end();
}));

module.exports = router;