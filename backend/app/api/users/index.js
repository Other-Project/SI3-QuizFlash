const { Router } = require("express");

const { User } = require("../../models");
const { catchErrors } = require("../../utils/errors/routes");

const router = new Router();

router.get("/", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Get all users'
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/User' }]
        } */

    res.status(200).json(User.get());
}));

router.get("/:userId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Get a specific user'
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/User' }
        }
        #swagger.responses[404] = {
            description: 'No user found with this id'
        } */

    res.status(200).json(User.getById(req.params.userId));
}));

router.post("/", (req, res) => catchErrors(req, res, () => {
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

    const user = User.create({ ...req.body });
    res.status(201).json(user);
}));

router.put("/:userId", (req, res) => catchErrors(req, res, () => {
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

    res.status(200).json(User.replace(req.params.userId, req.body));
}));

router.patch("/:userId", (req, res) => catchErrors(req, res, () => {
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

    res.status(200).json(User.update(req.params.userId, req.body));
}));

router.delete("/:userId", (req, res) => catchErrors(req, res, () => {
    /*  #swagger.tags = ['Users']
        #swagger.summary = 'Delete an user'
        #swagger.responses[204] = { }
        #swagger.responses[404] = {
            description: 'No user found with this id'
        } */

    User.delete(req.params.userId);
    res.status(204).end();
}));

module.exports = router;
