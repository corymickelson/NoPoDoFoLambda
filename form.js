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
class Form {
    get needAppearances() { return this._instance.needAppearances; }
    set needAppearances(value) { this._instance.needAppearances = value; }
    constructor(document) {
        this._instance = new document_1.__mod.Form(document._instance);
    }
    getObject() {
        return new object_1.Obj(this._instance.getObject());
    }
}
exports.Form = Form;
//# sourceMappingURL=form.js.map