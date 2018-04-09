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
const field_1 = require("./field");
const fs_1 = require("fs");
/**
 * The Signer class binds PoDoFo::PdfSignOutputDevice
 */
class Signer {
    constructor(doc, output) {
        if (output) {
            this._instance = new document_1.__mod.Signer(doc._instance, output);
        }
        else
            this._instance = new document_1.__mod.Signer(doc._instance);
    }
    signSync(signature, output) {
        return this._instance.signSync(signature, output);
    }
    sign(signature, output, cb) {
        this._instance.sign(cb, signature, output);
    }
    setField(field) {
        if (!field._instance) {
            throw Error("field undefined");
        }
        this._instance.setField(field._instance);
    }
    getField() {
        return new field_1.SignatureField(this._instance.getField());
    }
}
exports.Signer = Signer;
function signature(certfile, pkeyfile, password = '') {
    if (!fs_1.existsSync(certfile) || !fs_1.existsSync(pkeyfile)) {
        throw Error("One or both files not found");
    }
    return document_1.__mod.signature(certfile, pkeyfile, password);
}
exports.signature = signature;
//# sourceMappingURL=signer.js.map