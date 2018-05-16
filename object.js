"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
exports.resolveDictionary = (doc, candidate) => {
    if (candidate instanceof document_1.__mod.Obj)
        return document_1.__mod.Dictionary.tryGetDictionary(doc._instance, candidate);
    else
        return null;
};
//# sourceMappingURL=object.js.map