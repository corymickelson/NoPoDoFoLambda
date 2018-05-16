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
const base_document_1 = require("./base-document");
var NPDFVersion;
(function (NPDFVersion) {
    NPDFVersion[NPDFVersion["Pdf11"] = 0] = "Pdf11";
    NPDFVersion[NPDFVersion["Pdf12"] = 1] = "Pdf12";
    NPDFVersion[NPDFVersion["Pdf13"] = 2] = "Pdf13";
    NPDFVersion[NPDFVersion["Pdf14"] = 3] = "Pdf14";
    NPDFVersion[NPDFVersion["Pdf15"] = 4] = "Pdf15";
    NPDFVersion[NPDFVersion["Pdf16"] = 5] = "Pdf16";
    NPDFVersion[NPDFVersion["Pdf17"] = 6] = "Pdf17";
})(NPDFVersion = exports.NPDFVersion || (exports.NPDFVersion = {}));
var NPDFWriteMode;
(function (NPDFWriteMode) {
    NPDFWriteMode[NPDFWriteMode["Default"] = 1] = "Default";
    NPDFWriteMode[NPDFWriteMode["Compact"] = 2] = "Compact";
})(NPDFWriteMode = exports.NPDFWriteMode || (exports.NPDFWriteMode = {}));
class StreamDocument extends base_document_1.BaseDocument {
    constructor(name, version, writer, encrypt) {
        super();
        this._instance = new base_document_1.__mod.StreamDocument(name, version, writer, encrypt || null);
        this.setInternal(this._instance);
    }
    /**
     * @description Calls PdfStreamedDocument::Close and emits the close event.
     */
    close() {
        this._instance.close();
        this.emit('close');
    }
}
exports.StreamDocument = StreamDocument;
//# sourceMappingURL=stream-document.js.map