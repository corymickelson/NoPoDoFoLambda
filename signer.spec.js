"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tap = require("tape");
const document_1 = require("./document");
const field_1 = require("./field");
const annotation_1 = require("./annotation");
const rect_1 = require("./rect");
const path_1 = require("path");
const form_1 = require("./form");
const signer_1 = require("./signer");
tap('Signer', sub => {
    const doc = new document_1.Document(path_1.join(__dirname, '../test-documents/test.pdf'), true);
    doc.on('ready', (e) => __awaiter(this, void 0, void 0, function* () {
        sub.test('Sign Sync', standard => {
            standard.plan(1);
            if (e instanceof Error)
                throw e;
            try {
                let form = new form_1.Form(doc), formDict = form.getObject().asObject();
                if (!formDict['SigFlags'] ||
                    formDict['SigFlags'].type !== 'Number' ||
                    formDict['SigFlags'].asNumber() !== 3) {
                    if (formDict['SigFlags']) {
                        delete formDict['SigFlags'];
                    }
                    formDict['SigFlags'] = 3;
                }
                if (form.needAppearances)
                    form.needAppearances = false;
                const rect = new rect_1.Rect([0, 0, 10, 10]), page = doc.getPage(1), annot = page.createAnnotation(annotation_1.NPDFAnnotation.Widget, rect);
                annot.flag = annotation_1.NPDFAnnotationFlag.Hidden | annotation_1.NPDFAnnotationFlag.Invisible;
                const field = new field_1.SignatureField(annot, form, doc), signatureData = signer_1.signature(path_1.join(__dirname, '../test-documents/certificate.pem'), path_1.join(__dirname, '../test-documents/key.pem'));
                field.setReason('test');
                field.setLocation('here');
                field.setCreator('me');
                field.setFieldName('signer.sign');
                field.setDate();
                let signer = new signer_1.Signer(doc);
                signer.setField(field);
                let signedPath = "/tmp/signed.pdf";
                signer.signSync(signatureData, signedPath);
                let signed = new document_1.Document(signedPath);
                signed.on('ready', e => {
                    if (e instanceof Error)
                        standard.fail(e.message);
                    const signedPage = doc.getPage(1), fields = signedPage.getFields();
                    let signatureFieldCandidates = fields.filter(i => i.getFieldName() === 'signer.sign');
                    if (!signatureFieldCandidates || signatureFieldCandidates.length === 0)
                        standard.fail("signature field not found");
                    else if (signatureFieldCandidates.length === 1) {
                        standard.pass("signature found");
                    }
                    else
                        standard.fail("something went wrong");
                });
            }
            catch (e) {
                console.error(e);
            }
        });
    }));
});
//# sourceMappingURL=signer.spec.js.map