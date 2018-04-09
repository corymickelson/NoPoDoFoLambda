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
const page_1 = require("./page");
const document_1 = require("./document");
class Rect {
    constructor(position) {
        if (Array.isArray(position)) {
            this._instance = new document_1.__mod.Rect(position[0], position[1], position[2], position[3]);
        }
        else if (position instanceof page_1.Page) {
            this._instance = new document_1.__mod.Rect(position);
        }
        else {
            this._instance = new document_1.__mod.Rect();
        }
    }
    get bottom() {
        return this._instance.bottom;
    }
    set bottom(value) {
        this._instance.bottom = value;
    }
    get left() {
        return this._instance.left;
    }
    set left(value) {
        this._instance.left = value;
    }
    get width() {
        return this._instance.width;
    }
    set width(value) {
        this._instance.width = value;
    }
    get height() {
        return this._instance.height;
    }
    set height(value) {
        this._instance.height = value;
    }
    intersect(rect) {
        this._instance.intersect(rect);
    }
}
exports.Rect = Rect;
//# sourceMappingURL=rect.js.map