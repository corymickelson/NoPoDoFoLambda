"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const path_1 = require("path");
const document_1 = require("./document");
const test = require("tape");
test('get contents as string, contents tokenizer', t => {
    const filePath = path_1.join(__dirname, '../test-documents/test.pdf'), doc = new document_1.Document(filePath);
    doc.on('ready', e => {
        if (e instanceof Error)
            t.fail();
        const page = doc.getPage(0), tokenizer = new parser_1.ContentsTokenizer(page, doc);
        const pageContents = tokenizer.readAllContent();
        t.assert(pageContents.length === 155); // fix this
        t.end();
    });
});
//# sourceMappingURL=parser.spec.js.map