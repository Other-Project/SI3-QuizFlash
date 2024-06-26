const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const logger = require("../utils/logger.js");
const ValidationError = require("./errors/validation-error.js");
const NotFoundError = require("./errors/not-found-error.js");
const { pathPrefix } = require("./file");

module.exports = class BaseModel {
    constructor(name, schema) {
        if (!name) throw new Error("You must provide a name in constructor of BaseModel");
        if (!schema) throw new Error("You must provide a schema in constructor of BaseModel");
        this.schema = Joi.object().keys({ ...schema, id: Joi.string().required().uuid() });
        this.items = [];
        this.name = name;
        this.filePath = `${pathPrefix}/${this.name.toLowerCase()}.data.json`;
        this.load();
    }

    load() {
        try {
            this.items = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
        } catch (err) {
            if (err.message === "Unexpected end of JSON input") logger.log(`Warning : ${this.filePath} has wrong JSON format`);
        }
    }

    save() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2), "utf8");
        } catch (err) {
            logger.log(`Error while trying to save ${this.name}`);
        }
    }

    get() {
        return this.items;
    }

    /**
     * Gets an element by id
     *
     * @param {string} id
     * @return {*}
     */
    getById(id) {
        const item = this.items.find((i) => i.id === id);
        if (!item) throw new NotFoundError(`Cannot get ${this.name} id=${id} : not found`);
        return item;
    }

    create(obj = {}) {
        const item = { ...obj, id: uuidv4() };
        const { error } = this.schema.validate(item);
        if (error) throw new ValidationError(`Create Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error);
        this.items.push(item);
        this.save();
        return item;
    }

    /**
     * Completely replace the values of an entry
     * @param {string} id Entry id
     * @param obj New entry object
     * @returns The updated entry
     */
    replace(id, obj) {
        const prevObjIndex = this.items.findIndex((item) => item.id === id);
        if (prevObjIndex === -1) throw new NotFoundError(`Cannot replace ${this.name} id=${id} : not found`);
        const { error } = this.schema.validate(item);
        if (error) throw new ValidationError(`Replace Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error);
        this.items[prevObjIndex] = obj;
        this.save();
        return obj;
    }

    /**
     * Update some of the values of an entry
     * @param {string} id Entry id
     * @param obj The fields to update
     * @returns The updated entry
     */
    update(id, obj) {
        const prevObjIndex = this.items.findIndex((item) => item.id === id);
        if (prevObjIndex === -1) throw new NotFoundError(`Cannot update ${this.name} id=${id} : not found`);
        const updatedItem = assignIgnoreUndefined(this.items[prevObjIndex], obj);
        const { error } = this.schema.validate(updatedItem);
        if (error) throw new ValidationError(`Update Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error);
        this.items[prevObjIndex] = updatedItem;
        this.save();
        return updatedItem;
    }

    delete(id) {
        const objIndex = this.items.findIndex((item) => item.id === id);
        if (objIndex === -1) throw new NotFoundError(`Cannot delete ${this.name} id=${id} : not found`);
        this.items = this.items.filter((item) => item.id !== id);
        this.save();
    }
};

function assignIgnoreUndefined(...args) {
    const final = args.shift();
    args.filter(arg => !!arg).forEach(arg => {
        Object.entries(arg).forEach(nv => {
            const [name, value] = nv;
            if (value !== undefined) {
                final[name] = value;
            }
        });
    });
    return final;
}
