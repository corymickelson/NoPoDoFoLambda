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
const painter_1 = require("./painter");
class Cell {
    constructor(_table, _col, _row) {
        this._table = _table;
        this._col = _col;
        this._row = _row;
    }
    /**
     * Get the font on this cell or null for the default font
     * @returns {Font}
     */
    get font() {
        const fInstance = this._table._instance.getFont(this._col, this._row);
        return new painter_1.Font(fInstance);
    }
    get text() {
        return this._table._instance.getText(this._col, this._row);
    }
    set text(v) {
        this._table._instance.text = { col: this._col, row: this._row, text: v };
    }
    get foregroundColor() {
        return this._table._instance.getForegroundColor(this._col, this._row);
    }
    get backgroundColor() {
        return this._table._instance.getBackgroundColor(this._col, this._row);
    }
    get alignment() {
        return this._table._instance.getAlignment(this._col, this._row);
    }
    get wordWrap() {
        return this._table._instance.getWordWrap(this._col, this._row);
    }
    get verticalAlignment() {
        return this._table._instance.getVerticalAlignment(this._col, this._row);
    }
    getImage() {
        return this._table._instance.getImage(this._col, this._row);
    }
    hasImage() {
        return this._table._instance.hasImage();
    }
    hasBackgroundColor() {
        return this._table._instance.hasBackgroundColor();
    }
}
exports.Cell = Cell;
class Table {
    constructor(doc, cols, rows) {
        this._position = { x: 0, y: 0 };
        this._page = null;
        this._instance = new document_1.__mod.SimpleTable(doc._instance, cols, rows);
    }
    // model accessors
    /**
     * Sets the font for all contents of the table
     * @param {Font} v
     */
    set font(v) {
        if (v instanceof painter_1.Font === false) {
            throw Error("must be instance of Font");
        }
        this._instance.font = v._instance;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
    }
    get borderWidth() {
        return this._instance.borderWidth;
    }
    set borderWidth(v) {
        this._instance.borderWidth = v;
    }
    set foregroundColor(v) {
        this._instance.foregroundColor = v;
    }
    set alignment(v) {
        this._instance.alignment = v;
    }
    set wordWrap(v) {
        this._instance.wordWrap = v;
    }
    // table accessors
    get tableWidth() {
        if (!this._position) {
            throw Error('Table position must be set prior to calling this method');
        }
        if (!this._page) {
            throw Error('Table _page must be set prior to calling this method');
        }
        return this._instance.getTableWidth(this._position.x, this._position.y, this._page._instance);
    }
    set tableWidth(v) {
        this._instance.tableWidth = v;
    }
    get tableHeight() {
        if (!this._position) {
            throw Error('Table position must be set prior to calling this method');
        }
        if (!this._page) {
            throw Error('Table _page must be set prior to calling this method');
        }
        return this._instance.getTableHeight(this._position.x, this._position.y, this._page._instance);
    }
    set tableHeight(v) {
        this._instance.tableHeight = v;
    }
    /**
     * true if a new page is created automatically if more space is required to draw the table.
     * @returns {boolean}
     */
    get autoPageBreak() {
        return this._instance.autoPageBreak;
    }
    /**
     * Automatically create a new page and continue drawing the table on the new page, if there is not enough space on the current page.
     * The newly created page will be set as the current page on the painter used to draw and will be created using the same size as the old page.
     * @param {boolean} v
     */
    set autoPageBreak(v) {
        this._instance.autoPageBreak = v;
    }
    // model methods
    enableBorder(v) {
        this._instance.borderEnable(v);
    }
    hasBorders() {
        return this._instance.hasBorders();
    }
    enableBackground(v) {
        this._instance.enableBackground = v;
    }
    // table methods
    draw(point, painter) {
        if (painter instanceof painter_1.Painter === false) {
            throw Error('painter must be an instance of NoPoDoFo Painter');
        }
        this._instance.draw(point, painter._instance);
    }
    columnCount() {
        return this._instance.columnCount();
    }
    rowCount() {
        return this._instance.rowCount();
    }
    columnWidth(v) {
        this._instance.columnWidth(v);
    }
    columnWidths(v) {
        this._instance.columnWidths(v);
    }
    rowHeight(v) {
        this._instance.rowHeight(v);
    }
    rowHeights(v) {
        this._instance.rowHeights(v);
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map