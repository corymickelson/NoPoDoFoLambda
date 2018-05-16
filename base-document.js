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
const events_1 = require("events");
const object_1 = require("./object");
const reference_1 = require("./reference");
const page_1 = require("./page");
const painter_1 = require("./painter");
exports.__mod = require('bindings')('npdf');
var NPDFDestinationFit;
(function (NPDFDestinationFit) {
    NPDFDestinationFit[NPDFDestinationFit["Fit"] = 0] = "Fit";
    NPDFDestinationFit[NPDFDestinationFit["FitH"] = 1] = "FitH";
    NPDFDestinationFit[NPDFDestinationFit["FitV"] = 2] = "FitV";
    NPDFDestinationFit[NPDFDestinationFit["FitB"] = 3] = "FitB";
    NPDFDestinationFit[NPDFDestinationFit["FitBH"] = 4] = "FitBH";
    NPDFDestinationFit[NPDFDestinationFit["FitBV"] = 5] = "FitBV";
    NPDFDestinationFit[NPDFDestinationFit["Unknown"] = 255] = "Unknown";
})(NPDFDestinationFit = exports.NPDFDestinationFit || (exports.NPDFDestinationFit = {}));
class BaseDocument extends events_1.EventEmitter {
    get base() {
        return this._base;
    }
    set password(value) {
        this._password = value;
    }
    get password() {
        throw EvalError();
    }
    set pageMode(v) {
        this._base.pageMode = v;
    }
    get pageMode() {
        return this._base.pageMode;
    }
    set pageLayout(v) {
        this._base.pageLayout = v;
    }
    set printingScale(v) {
        this._base.printingScale = v;
    }
    set baseURI(v) {
        this._base.baseURI = v;
    }
    set language(v) {
        this._base.language = v;
    }
    get encrypt() {
        if (this._encrypt)
            return this._encrypt;
        else {
            const encrypt = new exports.__mod.Encrypt(this._base);
            this._encrypt = encrypt;
            return encrypt;
        }
    }
    constructor() {
        super();
    }
    /**
     * @todo Fix this, should not have to pass internal to Base Class
     * @param instance - document instance
     */
    setInternal(instance) {
        this._base = instance;
    }
    getPageCount() {
        return this._base.getPageCount();
    }
    getPage(pageN) {
        if (pageN > this.getPageCount() || pageN < 0) {
            throw new RangeError("pageN out of range");
        }
        const page = this._base.getPage(pageN);
        return new page_1.Page(page);
    }
    getObject(ref) {
        if (!ref || ref instanceof reference_1.Ref === false) {
            throw TypeError();
        }
        else if (ref.isIndirect() === false) {
            throw Error('Document.GetObject is only possible when the object referenced is an indirect object');
        }
        const objInstance = this._base.getObject(ref._base);
        return new object_1.Obj(objInstance);
    }
    getObjects() {
        const objects = this._base.getObjects();
        return objects.map(value => {
            return new object_1.Obj(value);
        });
    }
    getVersion() {
        return this._base.getVersion();
    }
    isLinearized() {
        return this._base.isLinearized();
    }
    /**
     * @desc Creates a PdfFont instance for use in NoPoDoFo generated Pdf Document. Note
     *      it is up to the user to check that the specified font family exists on the system.
     *      For font management use font-manager
     * @see https://github.com/corymickelson/font-manager
     * @param {CreateFontOpts & Object} opts
     * @returns {Font}
     */
    createFont(opts) {
        const instance = this._base.createFont(opts.fontName, opts.hasOwnProperty('bold') ? opts.bold : false, opts.hasOwnProperty('italic') ? opts.italic : false, opts.hasOwnProperty('encoding') ? opts.encoding : 1, opts.hasOwnProperty('embed') ? opts.embed : false, opts.hasOwnProperty('fileName') ? opts.fileName : null);
        return new painter_1.Font(instance);
    }
}
exports.BaseDocument = BaseDocument;
//# sourceMappingURL=base-document.js.map