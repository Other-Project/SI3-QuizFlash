const fs = require("node:fs");
const pathPrefix = `./database/${process.env.DB_FOLDER}`;

if (process.env["CLEAR_DB"] && fs.existsSync(pathPrefix))
    fs.rmSync(pathPrefix, {recursive: true});
if (process.env["INIT_DB"])
    fs.readdirSync(process.env["INIT_DB"])
        .forEach(basename => fs.cpSync(process.env["INIT_DB"] + "/" + basename, pathPrefix + basename, {recursive: true, errorOnExist: true}));
