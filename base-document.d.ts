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
import { EventEmitter } from "events";
import { NPDFInternal, Obj } from "./object";
import { IEncrypt } from "./encrypt";
import { PageMode, PageLayout, CreateFontOpts } from "./document";
import { Ref } from "./reference";
import { Page } from "./page";
import { Font } from "./painter";
export declare const __mod: any;
export declare enum NPDFDestinationFit {
    Fit = 0,
    FitH = 1,
    FitV = 2,
    FitB = 3,
    FitBH = 4,
    FitBV = 5,
    Unknown = 255,
}
export declare class BaseDocument extends EventEmitter {
    private _base;
    private _encrypt?;
    private _password?;
    readonly base: NPDFInternal;
    password: string;
    pageMode: PageMode;
    pageLayout: PageLayout;
    printingScale: string;
    baseURI: string;
    language: string;
    readonly encrypt: IEncrypt;
    constructor();
    /**
     * @todo Fix this, should not have to pass internal to Base Class
     * @param instance - document instance
     */
    setInternal(instance: NPDFInternal): void;
    getPageCount(): number;
    getPage(pageN: number): Page;
    getObject(ref: Ref): Obj;
    getObjects(): Array<Obj>;
    getVersion(): number;
    isLinearized(): boolean;
    /**
     * @desc Creates a PdfFont instance for use in NoPoDoFo generated Pdf Document. Note
     *      it is up to the user to check that the specified font family exists on the system.
     *      For font management use font-manager
     * @see https://github.com/corymickelson/font-manager
     * @param {CreateFontOpts & Object} opts
     * @returns {Font}
     */
    createFont(opts: CreateFontOpts & Object): Font;
}
