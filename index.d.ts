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
import { Data } from './data';
import { Document, FontEncoding } from './document';
import { Obj } from './object';
import { Page } from './page';
import { Annotation, NPDFAction, NPDFAnnotation, NPDFAnnotationFlag, NPDFAnnotationType } from './annotation';
import { CheckBox, Field, TextField, ListBox, ComboBox } from './field';
import { Painter, Encoding, ExtGState, Font, NPDFAlignment, NPDFBlendMode, NPDFColorSpace, NPDFFontType, NPDFLineCapStyle, NPDFLineJoinStyle, NPDFRenderingIntent, NPDFStokeStyle, NPDFTextRenderingMode, NPDFVerticalAlignment } from './painter';
import { Signer, signature } from './signer';
import { Ref } from './reference';
import { setup } from './setup';
import { Cell, Table } from './table';
declare const _default: {
    Data: typeof Data;
    Document: typeof Document;
    FontEncoding: typeof FontEncoding;
    Obj: typeof Obj;
    Page: typeof Page;
    Annotation: typeof Annotation;
    NPDFAction: typeof NPDFAction;
    NPDFAnnotation: typeof NPDFAnnotation;
    NPDFAnnotationFlag: typeof NPDFAnnotationFlag;
    NPDFAnnotationType: typeof NPDFAnnotationType;
    CheckBox: typeof CheckBox;
    Field: typeof Field;
    TextField: typeof TextField;
    ListBox: typeof ListBox;
    ComboBox: typeof ComboBox;
    Painter: typeof Painter;
    Encoding: typeof Encoding;
    ExtGState: typeof ExtGState;
    Font: typeof Font;
    NPDFAlignment: typeof NPDFAlignment;
    NPDFBlendMode: typeof NPDFBlendMode;
    NPDFColorSpace: typeof NPDFColorSpace;
    NPDFFontType: typeof NPDFFontType;
    NPDFLineCapStyle: typeof NPDFLineCapStyle;
    NPDFLineJoinStyle: typeof NPDFLineJoinStyle;
    NPDFRenderingIntent: typeof NPDFRenderingIntent;
    NPDFStokeStyle: typeof NPDFStokeStyle;
    NPDFTextRenderingMode: typeof NPDFTextRenderingMode;
    NPDFVerticalAlignment: typeof NPDFVerticalAlignment;
    Signer: typeof Signer;
    signature: typeof signature;
    Ref: typeof Ref;
    setup: typeof setup;
    Cell: typeof Cell;
    Table: typeof Table;
};
export default _default;
export declare const CONVERSION = 0.0028346456693;
