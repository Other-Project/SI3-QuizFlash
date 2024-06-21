const buildServer = require("./build-server.js");
const logger = require("./utils/logger.js");

let openapi;
try {
    openapi = require("./openapi.js");
} catch {
}
if (openapi) openapi().then(() => launchServer());
else launchServer();

function launchServer() {
    buildServer((server) => logger.info(`Server is listening on port ${server.address().port}`));
}