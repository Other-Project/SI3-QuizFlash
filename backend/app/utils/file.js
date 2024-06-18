const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const mime = require("mime-types");
const deasync = require("deasync");
const util = require("util");


const pathPrefix = path.resolve(`${__dirname}/../../database/${process.env.DB_FOLDER ?? ""}`);
const pathPattern = /^(?:[A-Z]:[\/\\]|\/?)(?:[^\/\\:<>"|?*]+?[\/\\])*\.?[^\/\\:<>"|?*]+?(?:\.\w+)?$/;
const promiseSync = deasync((promise, cb) => {
    promise.then((result) => cb(null, result)).catch((error) => cb(error));
});

function getMime(dataUrl) {
    return dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"));
}

function readFile(filepath) {
    if (!filepath || !fs.existsSync(filepath = `${pathPrefix}/assets/${filepath}`) || !fs.lstatSync(filepath).isFile()) return null;
    const mime_type = mime.lookup(filepath);
    const content = fs.readFileSync(filepath);
    return `data:${mime_type};base64,${content.toString("base64")}`;
}

function storeFile(filepath, base64url) {
    if (!base64url) return undefined;
    let mimeType = getMime(base64url);
    const mimeCat = mimeType.substring(0, mimeType.indexOf("/"));
    let data = Buffer.from(base64url.split(",")[1], "base64");
    if (mimeCat === "image") {
        data = deasync(util.callbackify(() => sharp(data)
            .resize(1024, 1024, { fit: "inside", withoutEnlargement: mimeType !== "image/svg+xml" })
            .toFormat("webp")
            .toBuffer()));
        mimeType = mime.lookup("webp");
    }
    filepath = `${pathPrefix}/assets/${filepath}.${mime.extension(mimeType)}`;
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, data);
    return path.relative(`${pathPrefix}/assets`, filepath);
}

function deleteFile(filepath) {
    if (!filepath) return;
    filepath = `${pathPrefix}/assets/${filepath}`;
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) return;
    if (fs.existsSync(filepath)) fs.rmSync(filepath);
    fs.rmdir(dir, _ => {
        // If it failed, the directory is probably not empty, so do nothing
        // If it succeeds, nothing to do
    });
}

module.exports = { pathPattern, pathPrefix, readFile, storeFile, deleteFile };