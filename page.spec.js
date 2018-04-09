"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const test = require("tape");
const document_1 = require("./document");
const object_1 = require("./object");
const field_1 = require("./field");
const painter_1 = require("./painter");
const image_1 = require("./image");
const filePath = path_1.join(__dirname, '../test-documents/test.pdf'), outFile = './test.out.pdf', doc = new document_1.Document(filePath);
let page;
doc.on('ready', e => {
    page = doc.getPage(0);
    runAll();
});
function pageRotation() {
    test('set page rotation', t => {
        const originalRotation = page.rotation, newRotation = originalRotation + 90;
        page.rotation = newRotation;
        doc.write(e => {
            const testDoc = new document_1.Document(outFile);
            testDoc.on('ready', e => {
                if (e instanceof Error)
                    t.fail();
                const testPage = testDoc.getPage(0);
                t.assert(testPage.rotation === newRotation, 'Page rotation updated');
                fs_1.unlinkSync(outFile);
                t.end();
            });
        }, outFile);
    });
}
function pageProperties() {
    test('page instance properties', t => {
        t.assert(page.number === 1, 'page number valid');
        t.assert(page.width > 0, 'page width valid');
        t.assert(page.height > 0, 'page height valid');
        t.end();
    });
}
function pageTrimBox() {
    test('get trimbox', t => {
        const trimBox = page.trimBox;
        t.assert(trimBox.height > 0, 'trimbox height is not null');
        t.assert(trimBox.width > 0, 'trimbox width not null');
        t.assert(trimBox.left === 0, 'trimbox left');
        t.assert(trimBox.bottom === 0, 'trimbox bottom');
        t.end();
    });
}
function pageFields() {
    test('get number of fields', t => {
        let n = page.getNumFields();
        t.assert(typeof n === 'number');
        // t.assert(page.getNumFields() === 22, 'page get number of fields counts all fields')
        t.end();
    });
}
function pageFieldInfoArray() {
    test('get fields info', t => {
        try {
            const fields = page.getFieldsInfo();
            // t.assert(fields.length === 22, 'page get field info get\'s info for each field')
            t.assert(fields instanceof Array);
            t.ok(fields);
            t.assert(fields.length > 0);
            t.end();
        }
        catch (e) {
            console.log(e);
            t.fail();
        }
    });
}
function pageGetField() {
    test('get field', t => {
        const field = page.getField(0);
        t.assert(field instanceof field_1.Field, 'is an instance of Field');
        t.end();
    });
}
function pageGetFields() {
    test('get fields', t => {
        const fields = page.getFields();
        t.assert(Array.isArray(fields), 'returns an array');
        t.assert(fields.length === page.getNumFields(), 'is not an empty array');
        t.assert(fields[0] instanceof field_1.Field, 'contains instance(s) of Field');
        t.end();
    });
}
function pageGetAnnotsCount() {
    test('page number of annotations', t => {
        t.assert(page.getNumAnnots() === 22, 'get\'s all annotations on the page');
        t.end();
    });
}
function pageGetAnnot() {
    test('page get annotation', t => {
        const annot = page.getAnnotation(0);
        t.ok(annot);
        t.assert(annot.getType() === 'Widget');
        t.end();
    });
}
function pageContents() {
    test('page contents', t => {
        const contents = page.getContents(false);
        t.assert(contents instanceof object_1.Obj, 'is an instance of Obj');
        t.assert(contents.length > 0, 'content is not null or empty');
        t.end();
    });
}
function pageResources() {
    test('page resources', t => {
        const resources = page.getResources();
        t.assert(resources instanceof object_1.Obj, 'is instance ob Obj');
        t.assert(resources.length > 0, 'is not null or empty');
        t.end();
    });
}
function pageAddImg() {
    test('add image', t => {
        const painter = new painter_1.Painter(doc), img = new image_1.Image(doc, path_1.join(__dirname, '../test-documents/test.jpg'));
        painter.page = page;
        painter.drawImage(img, 0, page.height - img.getHeight());
        painter.finishPage();
        doc.write(e => {
            if (e instanceof Error)
                t.fail();
            let objs = doc.getObjects();
            for (let i = 0; i < objs.length; i++) {
                let o = objs[i];
                if (o.type === 'Dictionary') {
                    let objDict = o.asObject(), objType = objDict['Type'], objSubType = objDict['SubType'];
                    if ((objType && objType.type === 'Name') ||
                        (objSubType && objSubType.type === 'Name')) {
                        if ((objType && objType.asName() === 'XObject') || (objSubType && objSubType.asName() === 'Image')) {
                            let imgObj = o.asObject()['Filter'];
                            if (imgObj && imgObj.type === 'Array') {
                                const imgObjArr = imgObj.asArray();
                                if (imgObjArr.length === 1) {
                                    if (imgObjArr[0].type === 'Name') {
                                        // if (imgObj.asArray().at(0).type === 'Name') {
                                        // if (imgObj.asArray().at(0).asName() === 'DCTDecode') {
                                        if (imgObjArr[0].asName() === 'DCTDecode') {
                                            extractImg(o, true);
                                            return;
                                        }
                                    }
                                }
                            }
                            else if (imgObj && imgObj.type === 'Name' && imgObj.asName() === 'DCTDecode') {
                                extractImg(o, true);
                                return;
                            }
                            else {
                                extractImg(o, false);
                                return;
                            }
                        }
                    }
                }
            }
        }, './img.out.pdf');
        function extractImg(obj, jpg) {
            let ext = jpg ? '.jpg' : '.ppm';
            fs_1.writeFile(`/tmp/test.img.extract.${ext}`, obj.stream, err => {
                if (err instanceof Error)
                    t.fail();
                t.assert(fs_1.existsSync(`/tmp/test.img.extract.${ext}`) === true);
                // if (existsSync('./img.out.pdf')) unlinkSync('./img.out.pdf')
                t.end();
            });
        }
    });
}
function runTest(test) {
    setImmediate(() => {
        global.gc();
        test();
    });
}
function runAll() {
    [
        pageRotation,
        pageProperties,
        pageTrimBox,
        pageFields,
        pageFieldInfoArray,
        pageGetField,
        pageGetFields,
        pageGetAnnotsCount,
        pageGetAnnot,
        pageContents,
        pageResources,
        pageAddImg
    ].map(i => runTest(i));
}
exports.runAll = runAll;
//# sourceMappingURL=page.spec.js.map