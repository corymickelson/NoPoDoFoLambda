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
const fs_1 = require("fs");
const object_1 = require("./object");
const page_1 = require("./page");
const events_1 = require("events");
const painter_1 = require("./painter");
const signer_1 = require("./signer");
const constants_1 = require("constants");
const reference_1 = require("./reference");
exports.__mod = require('bindings')('npdf');
var FontEncoding;
(function (FontEncoding) {
    FontEncoding[FontEncoding["WinAnsi"] = 1] = "WinAnsi";
    FontEncoding[FontEncoding["Standard"] = 2] = "Standard";
    FontEncoding[FontEncoding["PdfDoc"] = 3] = "PdfDoc";
    FontEncoding[FontEncoding["MacRoman"] = 4] = "MacRoman";
    FontEncoding[FontEncoding["MacExpert"] = 5] = "MacExpert";
    FontEncoding[FontEncoding["Symbol"] = 6] = "Symbol";
    FontEncoding[FontEncoding["ZapfDingbats"] = 7] = "ZapfDingbats";
    FontEncoding[FontEncoding["Win1250"] = 8] = "Win1250";
    FontEncoding[FontEncoding["Iso88592"] = 9] = "Iso88592";
    FontEncoding[FontEncoding["Identity"] = 0] = "Identity";
})(FontEncoding = exports.FontEncoding || (exports.FontEncoding = {}));
/**
 * @class Document
 * @desc Document represents a PdfMemDocument, construct from an existing pdf document.
 * Document is the core class for reading and manipulating PDF files and writing them back to disk.
 * Document was designed to allow easy access to the object structure of a PDF file.
 * Document should be used whenever you want to change the object structure of a PDF file.
 */
class Document extends events_1.EventEmitter {
    /**
     * File is loaded asynchronously, extends eventEmitter, will publish a 'ready'event when document has been loaded
     * @constructor
     * @param {string} [file] - pdf file path (optional)
     * @param update
     * @param {string} [pwd] - document password
     * @returns void
     */
    constructor(file, update = false, pwd) {
        super();
        this._loaded = false;
        this._password = undefined;
        this._instance = new exports.__mod.Document();
        if (Buffer.isBuffer(file)) {
            this.load(file, update, pwd || '');
        }
        else {
            fs_1.access(file, fs_1.constants.F_OK | fs_1.constants.R_OK, err => {
                if (err) {
                    this.emit('error', Error('file not found'));
                }
                else {
                    this.load(file, update, pwd || '');
                }
            });
        }
    }
    get loaded() {
        return this._loaded;
    }
    set password(value) {
        this._password = value;
    }
    get password() {
        throw EvalError();
    }
    get encrypt() {
        if (this._encrypt)
            return this._encrypt;
        else {
            const encrypt = new exports.__mod.Encrypt(this._instance);
            this._encrypt = encrypt;
            return encrypt;
        }
    }
    static gc(file, pwd, output, cb) {
        fs_1.access(file, constants_1.F_OK, err => {
            if (err) {
                throw Error('File not found');
            }
            exports.__mod.Document.gc(file, pwd, output, cb);
        });
    }
    /**
     * load pdf file, emits 'ready' || 'error' events
     * @param file - file path
     * @param update - load document for incremental updates
     * @param pwd
     */
    load(file, update = false, pwd) {
        let cb = (e) => {
            if (e && e instanceof Error) {
                if (e.message === "Password required to modify this document" && pwd) {
                    try {
                        this.password = pwd;
                        this._loaded = true;
                        this.emit('ready', this);
                    }
                    catch (e) {
                        this.emit('error', e);
                    }
                }
                else {
                    this.emit('error', e);
                }
            }
            else {
                this._loaded = true;
                this.emit('ready', this);
            }
        };
        this._instance.load(file, cb, update, Buffer.isBuffer(file), pwd || '');
    }
    getPageCount() {
        if (!this._loaded) {
            throw new Error('load a pdf file before calling this method');
        }
        return this._instance.getPageCount();
    }
    getPage(pageN) {
        if (pageN > this.getPageCount() || pageN < 0) {
            throw new RangeError("pageN out of range");
        }
        if (!this._loaded) {
            throw new Error('load a pdf file before calling this method');
        }
        const page = this._instance.getPage(pageN);
        return new page_1.Page(page);
    }
    getObject(ref) {
        if (!ref || ref instanceof reference_1.Ref === false) {
            throw TypeError();
        }
        else if (ref.isIndirect() === false) {
            throw Error('Document.GetObject is only possible when the object referenced is an indirect object');
        }
        const objInstance = this._instance.getObject(ref._instance);
        return new object_1.Obj(objInstance);
    }
    getObjects() {
        const objects = this._instance.getObjects();
        return objects.map(value => {
            return new object_1.Obj(value);
        });
    }
    /**
     * @description Append doc to the end of the loaded doc
     * @param {string} doc - pdf file path
     * @param password
     * @returns {Promise}
     */
    mergeDocument(doc, password) {
        return new Promise((resolve, reject) => {
            if (!this._loaded) {
                reject(new Error('load a pdf file before calling this method'));
            }
            fs_1.access(doc, constants_1.F_OK | constants_1.R_OK, err => {
                if (err)
                    return reject(err);
                else {
                    try {
                        password !== null ? this._instance.mergeDocument(doc, password) : this._instance.mergeDocument(doc);
                        return resolve();
                    }
                    catch (err) {
                        return reject(err);
                    }
                }
            });
        });
    }
    deletePage(pageIndex) {
        if (!this._loaded) {
            throw new Error('load a pdf file before calling this method');
        }
        if (this.getPageCount() < pageIndex || pageIndex < 0) {
            throw new RangeError('page index out of range');
        }
        this._instance.deletePage(pageIndex);
    }
    getVersion() {
        if (!this._loaded) {
            throw new Error('load a pdf file before calling this method');
        }
        return this._instance.getVersion();
    }
    isLinearized() {
        if (!this._loaded) {
            throw new Error('load a pdf file before calling this method');
        }
        return this._instance.isLinearized();
    }
    /**
     * Persist changes and write to disk or if no arguments provided returns Buffer
     * @param {string|Function} output - optional, if provided, will try to write to file
     * @param {Function} [cb] - optional callback
     */
    write(output, cb) {
        if (!this._loaded) {
            throw Error('Document has not been loaded, await ready event');
        }
        if (typeof output === 'string' && cb !== null || cb !== undefined) {
            this._instance.write(output, cb);
        }
        else {
            this._instance.writeBuffer(output);
        }
    }
    getTrailer() {
        let objInit = this._instance.getTrailer();
        return new object_1.Obj(objInit);
    }
    getCatalog() {
        return new object_1.Obj(this._instance.getCatalog());
    }
    isAllowed(protection) {
        return this._instance.isAllowed(protection);
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
        const instance = this._instance.createFont(opts.fontName, opts.hasOwnProperty('bold') ? opts.bold : false, opts.hasOwnProperty('italic') ? opts.italic : false, opts.hasOwnProperty('encoding') ? opts.encoding : 1, opts.hasOwnProperty('embed') ? opts.embed : false, opts.hasOwnProperty('fileName') ? opts.fileName : null);
        return new painter_1.Font(instance);
    }
    writeUpdate(device) {
        if (device instanceof signer_1.Signer)
            this._instance.writeUpdate(device._instance);
        else
            this._instance.writeUpdate(device);
    }
    createEncrypt(opts) {
        this._instance.encrypt = opts;
        if (this.encrypt === null) {
            throw Error('Failed to set encrypt');
        }
        return this.encrypt;
    }
}
exports.Document = Document;
//# sourceMappingURL=document.js.map