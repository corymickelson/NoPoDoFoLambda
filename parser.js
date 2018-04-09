"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
/**
 * This class is a parser for content streams in PDF documents.
 * PoDoFo::PdfContentsTokenizer is currently a work in progress.
 */
class ContentsTokenizer {
    constructor(page, doc) {
        this._instance = new document_1.__mod.ContentsTokenizer(page._instance, doc._instance);
    }
    /**
     * Read all text content from the page.
     * @returns {Array<string>}
     */
    readAllContent() {
        return this._instance.readAll();
    }
}
exports.ContentsTokenizer = ContentsTokenizer;
//# sourceMappingURL=parser.js.map