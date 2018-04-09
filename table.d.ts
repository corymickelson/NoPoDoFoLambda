/// <reference types="node" />
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
import { Document } from "./document";
import { Font, NPDFAlignment, NPDFColor, NPDFPoint, NPDFVerticalAlignment, Painter } from "./painter";
import { Page } from "./page";
export declare class Cell {
    private _table;
    private _col;
    private _row;
    /**
     * Get the font on this cell or null for the default font
     * @returns {Font}
     */
    readonly font: Font;
    text: string;
    readonly foregroundColor: NPDFColor;
    readonly backgroundColor: NPDFColor;
    readonly alignment: NPDFAlignment;
    readonly wordWrap: boolean;
    readonly verticalAlignment: NPDFVerticalAlignment;
    constructor(_table: Table, _col: number, _row: number);
    getImage(): Buffer;
    hasImage(): boolean;
    hasBackgroundColor(): boolean;
}
export declare class Table {
    private _instance;
    private _position;
    private _page;
    /**
     * Sets the font for all contents of the table
     * @param {Font} v
     */
    font: Font;
    page: Page | null;
    borderWidth: number;
    foregroundColor: NPDFColor;
    alignment: NPDFAlignment;
    wordWrap: boolean;
    tableWidth: number;
    tableHeight: number;
    /**
     * true if a new page is created automatically if more space is required to draw the table.
     * @returns {boolean}
     */
    /**
     * Automatically create a new page and continue drawing the table on the new page, if there is not enough space on the current page.
     * The newly created page will be set as the current page on the painter used to draw and will be created using the same size as the old page.
     * @param {boolean} v
     */
    autoPageBreak: boolean;
    constructor(doc: Document, cols: number, rows: number);
    enableBorder(v: boolean): void;
    hasBorders(): boolean;
    enableBackground(v: boolean): void;
    draw(point: NPDFPoint, painter: Painter): void;
    columnCount(): number;
    rowCount(): number;
    columnWidth(v: number): void;
    columnWidths(v: Array<number>): void;
    rowHeight(v: number): void;
    rowHeights(v: Array<number>): void;
}
