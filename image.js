"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
class Image {
    /**
     *
     * @param {IDocument} _doc - document to embed image in
     * @param {string | Buffer} data - image file path, or image buffer (buffer not yet implemented)
     */
    constructor(_doc, data) {
        this._doc = _doc;
        if (data) {
            this._instance = new document_1.__mod.Image(_doc._instance, data);
        }
        else {
            this._instance = new document_1.__mod.Image(_doc._instance);
        }
    }
    getWidth() {
        return this._instance.getWidth();
    }
    getHeight() {
        return this._instance.getHeight();
    }
    loadFromFile(file) {
        this._instance.setFile(file);
    }
    /**
     * @description Embeds data as an image on the document. To use this image pass to Painter.drawImage.
     *      New instances will reuse embedded img object if passed the same image reference.
     * @throws {TypeError} - throw type error on invalid arguments.
     * @param data img data
     * @returns void
     */
    loadFromBuffer(data) {
        if (Buffer.isBuffer(data))
            this._instance.setData(data.toString('utf8'));
        else if (typeof data === 'string' || data instanceof String)
            this._instance.setData(data);
        else
            throw new TypeError("Image.setData requires a single argument of type string | Buffer");
    }
    isLoaded() {
        return this._instance.isLoaded();
    }
    setInterpolate(value) {
        this._instance.setInterpolate(value);
    }
}
exports.Image = Image;
//# sourceMappingURL=image.js.map