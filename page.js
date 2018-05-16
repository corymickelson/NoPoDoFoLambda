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
const field_1 = require("./field");
const rect_1 = require("./rect");
const annotation_1 = require("./annotation");
class Page {
    constructor(_instance) {
        this._instance = _instance;
    }
    get trimBox() {
        const trimBoxRect = this._instance.trimBox;
        return new rect_1.Rect([trimBoxRect.left, trimBoxRect.bottom, trimBoxRect.width, trimBoxRect.height]);
    }
    set trimBox(rect) {
        Page.assertRect(rect);
        this._instance.trimBox = rect;
    }
    get number() {
        return this._instance.number;
    }
    set number(n) {
        throw Error("Can not change page number. Use Document.splicePage() to adjust page order.");
    }
    get width() {
        return this._instance.width;
    }
    set width(value) {
        if (Number.isNaN(value)) { }
        this._instance.width = value;
    }
    get height() {
        return this._instance.height;
    }
    set height(value) {
        if (Number.isNaN(value)) { }
        this._instance.height = value;
    }
    get rotation() {
        return this._instance.rotation;
    }
    set rotation(degree) {
        if (degree < 0 || degree > 270) {
            throw Error('rotation must be one of: 0, 90, 180, 270');
        }
        this._instance.rotation = degree;
    }
    getContents(append) {
        return this._instance.getContents(append);
    }
    getResources() {
        return this._instance.getResources();
    }
    getMediaBox() {
        const mediaBoxPositions = this._instance.getMediaBox();
        return new rect_1.Rect([mediaBoxPositions.left, mediaBoxPositions.bottom, mediaBoxPositions.width, mediaBoxPositions.height]);
    }
    getBleedBox() {
        const positions = this._instance.getBleedBox();
        return new rect_1.Rect([positions.left, positions.bottom, positions.width, positions.height]);
    }
    getArtBox() {
        const positions = this._instance.getArtBox();
        return new rect_1.Rect([positions.left, positions.bottom, positions.width, positions.height]);
    }
    getNumFields() {
        return this._instance.getNumFields();
    }
    getFieldsInfo() {
        return this._instance.getFieldsInfo();
    }
    getFieldIndex(fieldName) {
        return this._instance.getFieldIndex(fieldName);
    }
    getField(index) {
        // return new Field(this, index)
        return new field_1.Field(this._instance.getField(index));
    }
    getFields() {
        const fields = [];
        const count = this.getNumFields();
        let i = 0;
        for (; i < count; i++) {
            fields[i] = (new field_1.Field(this._instance.getField(i)));
        }
        return fields;
    }
    createAnnotation(type, rect) {
        const instance = this._instance.createAnnotation(type, rect._instance);
        return new annotation_1.Annotation(instance);
    }
    getAnnotation(index) {
        const instance = this._instance.getAnnotation(index);
        return new annotation_1.Annotation(instance);
    }
    getNumAnnots() {
        return this._instance.getNumAnnots();
    }
    getAnnotations() {
        const count = this.getNumAnnots();
        const output = [];
        for (let i = 0; i < count; i++) {
            try {
                const item = this.getAnnotation(i);
                output.push(item);
            }
            catch (e) {
                throw e;
            }
        }
        return output;
    }
    deleteAnnotation(index) {
        this._instance.deleteAnnotation(index);
    }
    static assertRect(rect) {
        if (rect.bottom === null ||
            rect.height === null ||
            rect.left === null ||
            rect.width === null) {
            throw Error("Rect must be initialized before use.");
        }
    }
}
exports.Page = Page;
//# sourceMappingURL=page.js.map