"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file is part of the NoPoDoFo (R) project.
 * Copyright (c) 2017-2018
 * Authors: Cory Mickelson, et al.
 *
 * NoPoDoFo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NoPoDoFo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const document_1 = require("./document");
const object_1 = require("./object");
const form_1 = require("./form");
class Field {
    constructor(_instance) {
        this._instance = _instance;
    }
    getType() {
        return this._instance.getType();
    }
    getFieldName() {
        return this._instance.getFieldName();
    }
    getAlternateName() {
        return this._instance.getAlternateName();
    }
    getMappingName() {
        return this._instance.getMappingName();
    }
    isRequired() {
        return this._instance.isRequired();
    }
    setRequired(required) {
        this._instance.setRequired(required);
    }
    setAlternateName(name) {
        this._instance.setAlternateName(name);
    }
    setMappingName(name) {
        this._instance.setMappingName(name);
    }
}
exports.Field = Field;
class TextField extends Field {
    constructor(field) {
        super(field._instance);
        if (field.getType() !== 'TextField') {
            throw Error('field parameter must be a field of type TextField');
        }
        this._textFieldInstance = new document_1.__mod.TextField(field._instance);
    }
    get text() {
        return this._textFieldInstance.text;
    }
    set text(value) {
        this._textFieldInstance.text = value;
    }
}
exports.TextField = TextField;
class CheckBox extends Field {
    get checked() {
        return this._checkboxInstance.checked;
    }
    set checked(value) {
        this._checkboxInstance.checked = value;
    }
    constructor(field) {
        super(field._instance);
        if (field.getType() !== 'CheckBox') {
            throw Error('must be of type CheckBox');
        }
        this._checkboxInstance = new document_1.__mod.CheckBox(field._instance);
    }
}
exports.CheckBox = CheckBox;
class EnumerableField extends Field {
    get selected() {
        return this._enumerableFieldInstance.selected;
    }
    set selected(index) {
        this._enumerableFieldInstance.selected = index;
    }
    get length() {
        return this._enumerableFieldInstance.length;
    }
    constructor(field) {
        super(field._instance);
        const t = field.getType();
        if (t === 'ListBox' || t === 'ComboBox') {
            this._enumerableFieldInstance = new document_1.__mod.ListField(field._instance);
        }
        else {
            throw TypeError("EnumerableField must be a field type ListBox or ComboBox");
        }
    }
    getItem(index) {
        return this._enumerableFieldInstance.getItem(index);
    }
    setItem(item) {
        this._enumerableFieldInstance.insertItem(item.value, item.display);
    }
    removeItem(index) {
        this._enumerableFieldInstance.removeItem(index);
    }
}
exports.EnumerableField = EnumerableField;
class ListBox extends EnumerableField {
    constructor(field) {
        super(field);
        if (field.getType() !== 'ListBox') {
            throw TypeError('Must be field type ListBox');
        }
        this._listBoxInstance = new document_1.__mod.ListBox(field._instance);
    }
}
exports.ListBox = ListBox;
class ComboBox extends EnumerableField {
    constructor(field) {
        super(field);
        if (field.getType() !== 'ComboBox') {
            throw TypeError('Must be field type ComboBox');
        }
        this._comboBoxInstance = new document_1.__mod.ComboBox(field._instance);
    }
}
exports.ComboBox = ComboBox;
class SignatureField {
    constructor(annot, form, doc) {
        if (form instanceof form_1.Form && doc instanceof document_1.Document) {
            this._instance = new document_1.__mod.SignatureField(annot._instance, form._instance, doc._instance);
        }
        else {
            this._instance = new document_1.__mod.SignatureField(annot);
        }
    }
    setReason(reason) {
        this._instance.setReason(reason);
    }
    setLocation(local) {
        this._instance.setLocation(local);
    }
    setCreator(creator) {
        this._instance.setCreator(creator);
    }
    setDate() {
        this._instance.setDate();
    }
    setFieldName(n) {
        this._instance.setFieldName(n);
    }
    getObject() {
        const instance = this._instance.getObject();
        return new object_1.Obj(instance);
    }
}
exports.SignatureField = SignatureField;
//# sourceMappingURL=field.js.map