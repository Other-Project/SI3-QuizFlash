const {Router} = require("express");

const router = new Router();
const UserRouter = require("./users");

router.get("/status", (req, res) => res.status(200).json("ok"));
router.use("/users", UserRouter);

module.exports = router;
