const {Router} = require("express");
const QuizzesRouter = require("./quizzes");
const UserRouter = require("./users");
const StatisticsRouter = require("./statistics");
const AuthRouter = require("./auth");
const UtilsRouter = require("./utils");

const router = new Router();

router.get("/status", (req, res) => res.status(200).json("ok"));
router.use("/quizzes", QuizzesRouter);
router.use("/users", UserRouter);
router.use("/statistics", StatisticsRouter);
router.use("/auth", AuthRouter);
router.use("/utils", UtilsRouter);

module.exports = router;
