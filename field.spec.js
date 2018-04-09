"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const tap = require("tape");
const document_1 = require("./document");
const field_1 = require("./field");
const filePath = path_1.join(__dirname, '../test-documents/iss.16.checkbox-field-state-options.pdf');
tap('Fields', sub => {
    const doc = new document_1.Document(filePath);
    doc.on('ready', e => {
        if (e instanceof Error)
            sub.fail();
        const page = doc.getPage(0), fields = page.getFields();
        sub.test('variants', standard => {
            standard.test('create field instance from existing pdf field', t => {
                let field = page.getField(0);
                t.assert(field !== null);
                t.assert(field instanceof field_1.Field);
                console.log(field.getType());
                t.assert(field.getType() === 'TextField');
                t.end();
            });
            standard.test('Can instantiate a TextField given a field of type TextField', t => {
                let field = page.getField(0);
                const text = new field_1.TextField(field);
                t.ok(text);
                t.end();
            });
            standard.test('Can instantiate a Checkbox given a field of type CheckBox', t => {
                let index = -1;
                for (let i = 0; i < fields.length; i++) {
                    let type = fields[i].getType();
                    if (type === 'CheckBox') {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    console.warn(`Fields variant Checkbox was not found in document ${filePath}`);
                    t.end();
                }
                else {
                    const field = page.getField(index);
                    t.assert(field.getType() === 'CheckBox');
                    const checkbox = new field_1.CheckBox(field);
                    t.ok(checkbox);
                    t.assert(checkbox.checked === false);
                    t.end();
                }
            });
            standard.test('Can instantiate a ListBox', t => {
                let index = -1;
                for (let i = 0; i < fields.length; i++) {
                    let type = fields[i].getType();
                    if (type === 'ListBox') {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    console.warn(`Fields variant ListBox was not found in document ${filePath}`);
                    t.end();
                }
                else {
                    const field = page.getField(index);
                    t.assert(field.getType() === 'ListField');
                    const list = new field_1.ListBox(field);
                    t.ok(list);
                    t.assert(list.selected === -1);
                    t.end();
                }
            });
            standard.test('ComboBox variant', t => {
                let index = -1;
                for (let i = 0; i < fields.length; i++) {
                    let type = fields[i].getType();
                    if (type === 'ComboBox') {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    console.warn(`Fields variant ComboBox was not found in document ${filePath}`);
                    t.end();
                }
                else {
                    const field = page.getField(index);
                    t.assert(field.getType() === 'ComboBox');
                    const combo = new field_1.ComboBox(field);
                    t.ok(combo);
                    t.assert(combo.selected === -1);
                    t.end();
                }
            });
        });
    });
});
//# sourceMappingURL=field.spec.js.map