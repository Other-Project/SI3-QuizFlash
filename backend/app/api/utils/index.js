const { Router } = require("express");
const { catchErrors } = require("../../utils/errors/routes");
const { getAllTags } = require("./manager");
const checkAuthentification = require("../../utils/auth-checker");
const access = require("../../models/access-restriction.model");

const router = new Router();

router.get("/getTags", checkAuthentification(access.user), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Utils']
        #swagger.summary = 'Get all tags existing in the DataBase'
        #swagger.responses[200] = {
            schema: ["string"]
        } */

    res.status(200).json(getAllTags());
}));


module.exports = router;

