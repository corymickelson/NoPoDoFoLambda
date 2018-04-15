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
import { Document } from './document';
import { SignatureField } from "./field";
/**
 * The Signer class binds PoDoFo::PdfSignOutputDevice
 */
export declare class Signer {
    private _instance;
    constructor(doc: Document, output?: string);
    signSync(signature: string, output?: string): Buffer;
    sign(signature: string, output: string, cb: (e: Error, d: Buffer) => void): void;
    setField(field: SignatureField): void;
    getField(): SignatureField;
}
export declare function signature(certfile: string, pkeyfile: string, password?: string): Promise<string>;
