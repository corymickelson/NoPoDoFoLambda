"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const tap = require("tape");
const document_1 = require("./document");
const constants_1 = require("constants");
const uuid_1 = require("uuid");
const object_1 = require("./object");
const filePath = path_1.join(__dirname, '../test-documents/test.pdf'), pwdDoc = path_1.join(__dirname, '../test-documents/pwd.pdf');
exports.end = (...tests) => tests.forEach(t => t.end());
tap('Document Api', sub => {
    sub.test('unprotected documents', standard => {
        const doc = new document_1.Document(filePath);
        doc.on('ready', (pdf) => {
            standard.test('loaded successfully and emitted ready event', t => {
                if (pdf instanceof Error)
                    t.fail('Failed to load document');
                t.assert(pdf.loaded === true, 'pdf successfully loaded');
                exports.end(t);
            });
            standard.test('document properties getter/setter (s)', t => {
                t.assert(pdf.getPageCount() > 0, 'Page count exists');
                t.throws(() => pdf.password, 'Passwords are kept secret');
                t.doesNotThrow(() => pdf.encrypt, 'Encrypt should not throw, if not exits return null');
                t.throws(() => pdf.getPage(10), 'Range Error');
                exports.end(t);
            });
            standard.test('document trailer, catalog, objects', t => {
                let objs = pdf.getObjects();
                t.assert(objs instanceof Array, 'Gets all objects as an array');
                t.assert(objs[0] instanceof object_1.Obj, 'array items instance of Obj');
                let trailer = pdf.getTrailer(), catalog = pdf.getCatalog();
                t.assert(trailer instanceof object_1.Obj, 'get trailer');
                t.assert(trailer.type === 'Dictionary', 'trailer is a dictionary');
                t.assert(catalog instanceof object_1.Obj, 'get catalog');
                t.assert(catalog.type === 'Dictionary', 'catalog is a dictionary');
                t.end();
            });
            standard.test('document create font', t => {
                let font = pdf.createFont({ fontName: 'monospace', encoding: document_1.FontEncoding.WinAnsi });
                const m = font.getMetrics();
                t.ok(m);
                exports.end(t);
            });
            standard.test('document delete page object by index', t => {
                const beforeCount = pdf.getPageCount();
                pdf.deletePage(0);
                const afterCount = pdf.getPageCount();
                t.assert(beforeCount - 1 === afterCount, 'Page removed and page count decremented');
                exports.end(t);
            });
            standard.test('document information', t => {
                t.false(pdf.isLinearized(), 'test.pdf is a non-linearized document');
                t.true(pdf.getVersion() === 1.7, 'test.pdf PDF version is 1.7');
                exports.end(t);
            });
            standard.test('can write', t => {
                const outFile = `${uuid_1.v4()}.pdf`;
                pdf.write((e, v) => {
                    if (e instanceof Error)
                        t.fail('Failed to write document');
                    fs_1.access(outFile, constants_1.F_OK, err => {
                        if (err)
                            t.fail('Failed to write document');
                        else {
                            fs_1.unlinkSync(outFile);
                            t.pass("Modified file written successfully");
                            exports.end(t);
                        }
                    });
                }, outFile);
            });
            standard.test('is allowed', t => {
                t.ok(pdf.isAllowed('Copy'), 'Copy protection not defined. Can get ProtectionProperties');
                t.end();
            });
        });
        sub.test('document exceptions', standard => {
            standard.test('password required, password setter', t => {
                t.plan(1);
                const doc = new document_1.Document(pwdDoc);
                doc.on('ready', () => {
                    t.fail('Should have thrown password required error');
                })
                    .on('error', e => {
                    if (e.message === "Password required to modify this document") {
                        try {
                            doc.password = 'secret';
                            t.pass('password required and password set');
                        }
                        catch (pwdErr) {
                            t.fail(pwdErr.message);
                        }
                    }
                });
            });
            standard.test('password required', t => {
                const doc = new document_1.Document(pwdDoc);
                doc.on('ready', () => {
                    t.fail('Should have thrown password required error');
                })
                    .on('error', e => {
                    t.ok(e instanceof Error, 'should bubble up error');
                    t.assert(e.message === "Password required to modify this document");
                    exports.end(t);
                });
            });
            standard.test('file not found', t => {
                let doc = new document_1.Document('/bad/path');
                doc.on('ready', e => {
                    t.fail('should have thrown "file not found" error.');
                })
                    .on('error', (e) => {
                    t.assert(e.message === 'file not found');
                    exports.end(t);
                });
            });
        });
        sub.test('document merger', standard => {
            const doc = new document_1.Document(filePath), outFile = `${uuid_1.v4()}.pdf`;
            doc.on('ready', () => {
                let originalPC = doc.getPageCount();
                doc.mergeDocument(filePath)
                    .then(() => {
                    doc.write(e => {
                        if (e)
                            standard.fail(e.message);
                        const doc2 = new document_1.Document(outFile);
                        doc2.on('ready', () => {
                            let doc2PC = doc2.getPageCount();
                            standard.assert(originalPC * 2 === doc2PC, "merged document");
                            fs_1.unlinkSync(outFile);
                            standard.end();
                        });
                    }, outFile);
                })
                    .catch(e => standard.fail(e.message));
            });
        });
        sub.test('write buffer', standard => {
            const doc = new document_1.Document(filePath);
            doc.on('ready', (pdf) => {
                pdf.write((e, d) => {
                    if (e)
                        standard.fail(e.message);
                    else {
                        standard.ok(d);
                        standard.assert(d instanceof Buffer);
                        standard.assert(d.length > 0);
                        exports.end(standard);
                    }
                });
            });
        });
        sub.test('gc', standard => {
            const output = `/tmp/${uuid_1.v4()}.pdf`;
            document_1.Document.gc(filePath, "", output, e => {
                if (e instanceof Error)
                    standard.fail();
                else {
                    fs_1.access(output, constants_1.F_OK, err => {
                        if (err)
                            standard.fail();
                        else {
                            standard.pass('Gc doc written to output location');
                            standard.end();
                        }
                    });
                }
            });
        });
    });
});
//# sourceMappingURL=document.spec.js.map