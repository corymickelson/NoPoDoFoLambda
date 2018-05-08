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
import { Obj } from "./object";
import { Document } from './document';
export interface IRef {
    objectNumber: number;
    generation: number;
    isIndirect(): boolean;
    toString(): string;
}
export declare class Ref {
    private _instance;
    objectNumber: number;
    readonly generation: any;
    set(value: number): void;
    constructor(_instance: any);
    write(output: string): void;
    /**
     * Check if ref points to an indirect object. Object is indirect if both object and generation numbers are not 0
     */
    isIndirect(): boolean;
    toString(): string;
    /**
     * @desc If Ref is an indirect object (most likely) you can "de-reference" the reference to an object.
     * @todo: This should be possible without needing to pass the document
     * @todo Replace error message with link to documentation
     * @param {Document} document - the document that contains the reference
     * @returns {Obj}
     */
    deRef(document: Document): Obj;
}
