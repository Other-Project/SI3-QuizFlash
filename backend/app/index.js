const buildServer = require("./build-server.js");
const openapi = require("./openapi.js");
const logger = require("./utils/logger.js");

openapi().then(() => {
    buildServer((server) => logger.info(`Server is listening on port ${server.address().port}`));
});
