"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tap = require("tape");
const path_1 = require("path");
const document_1 = require("./document");
const fs_1 = require("fs");
const constants_1 = require("constants");
const filePath = path_1.join(__dirname, '../test-documents/test.pdf'), secureDoc = path_1.join(__dirname, '../test-documents/secure.pdf');
tap('encrypt api', sub => {
    sub.test('can persist encrypted document', standard => {
        const doc = new document_1.Document(filePath), encryptionOption = {
            ownerPassword: 'secret',
            userPassword: 'secret',
            keyLength: 40,
            protection: ['Edit', 'FillAndSign'],
            algorithm: 'aesv3'
        }, secureDoc = path_1.join(__dirname, '../test-documents/secure.tmp.pdf');
        doc.on('ready', () => {
            doc.createEncrypt(encryptionOption);
            doc.write(e => {
                if (e instanceof Error)
                    standard.fail();
                else {
                    fs_1.access(secureDoc, constants_1.F_OK, err => {
                        if (err)
                            standard.fail('Wrote bad document');
                        else {
                            standard.pass('Can create encrypted document');
                            fs_1.unlinkSync(secureDoc);
                            standard.end();
                        }
                    });
                }
            }, secureDoc);
        });
    });
    sub.test('Can read encrypted document, pwd provided', standard => {
        const encryptDoc = new document_1.Document(secureDoc, false, 'secret');
        encryptDoc.on('ready', e => {
            if (e instanceof Error) {
                standard.fail(`error thrown: ${e.message}`);
                return;
            }
            const encryptSubject = encryptDoc.encrypt;
            standard.ok(encryptSubject, 'encrypt object is NOT null');
            standard.true(encryptSubject.protections.hasOwnProperty('Edit') &&
                encryptSubject.protections.Edit === true, 'Encrypt protections enforced, allowed with password');
            standard.false(encryptSubject.protections.Copy, 'Non explicitly set protections default to false');
            standard.end();
        })
            .on('error', () => standard.fail('Failed to throw error warning'));
    });
    sub.test('Can read encrypted document, pwd NOT provided', standard => {
        const encryptDoc = new document_1.Document(secureDoc);
        encryptDoc.on('ready', e => {
            if (e instanceof Error) {
                standard.fail(`error thrown: ${e.message}`);
            }
        })
            .on('error', e => {
            if (e.message.match(/password required/gi).length > 0) {
                encryptDoc.password = 'secret';
                const encrypt = encryptDoc.encrypt;
                standard.ok(encrypt);
                standard.end();
            }
            else {
                standard.fail('Password required error was NOT thrown');
            }
        });
    });
});
//# sourceMappingURL=encrypt.spec.js.map