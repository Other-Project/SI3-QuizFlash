const {Router} = require("express");
const {User} = require("../../models");
const {catchErrors} = require("../../utils/errors/routes");
const { createUser, replaceUser, updateUser, deleteUser } = require("./manager");
const checkAuthentication = require("../../utils/auth-checker");
const access = require("../../models/access-restriction.model");
const { readFile } = require("../../utils/file");
const router = new Router();

router.get("/", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Get all users'
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/User' }]
        } */

    res.status(200).json(User.get().map(user => ({
        id: user.id,
        access: user.access,
        pictureUrl: readFile(user.pictureUrl),
        lastname: user.lastname,
        firstname: user.firstname,
        gender: user.gender
    })));
}));

router.get("/:userId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Get a specific user'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[404] = {
            description: 'No user found with this id'
        } */

    const user = User.getById(req.params.userId);
    res.status(200).json({ ...user, pictureUrl: readFile(user.pictureUrl) });
}));

router.post("/", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Add new user'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[201] = {
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        } */

    res.status(201).json(createUser(req.body));
}));

router.put("/:userId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Modify an existing user'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: 'No user found with this id'
        } */

    res.status(200).json(replaceUser(req.params.userId, req.body));
}));

router.patch("/:userId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Modify parts of an existing user'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[400] = {
            description: 'Invalid request'
        }
        #swagger.responses[404] = {
            description: 'No user found with this id'
        } */

    res.status(200).json(updateUser(req.params.userId, req.body));
}));

router.delete("/:userId", checkAuthentication(access.admin), (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Delete an user'
        #swagger.responses[204] = { }
        #swagger.responses[404] = {
            description: 'No user found with this id'
        } */

    deleteUser(req.params.userId);
    res.status(204).end();
}));

module.exports = router;
