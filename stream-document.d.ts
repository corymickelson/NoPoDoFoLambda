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
import { BaseDocument } from "./base-document";
import { IEncrypt } from "./encrypt";
export declare enum NPDFVersion {
    Pdf11 = 0,
    Pdf12 = 1,
    Pdf13 = 2,
    Pdf14 = 3,
    Pdf15 = 4,
    Pdf16 = 5,
    Pdf17 = 6,
}
export declare enum NPDFWriteMode {
    Default = 1,
    Compact = 2,
}
export declare class StreamDocument extends BaseDocument {
    private _instance;
    constructor(name: string, version: NPDFVersion, writer: NPDFWriteMode, encrypt?: IEncrypt);
    /**
     * @description Calls PdfStreamedDocument::Close and emits the close event.
     */
    close(): void;
}
