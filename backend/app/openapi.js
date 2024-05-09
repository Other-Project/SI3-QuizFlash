const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "QuizFlash",
        description: "Backend API used by QuizFlash"
    },
    host: "localhost:9428",
    basePath: "/api/"
};

const outputFile = "./openapi.json";
const routes = ["./api/index.js"];

module.exports = () => swaggerAutogen(outputFile, routes, doc);