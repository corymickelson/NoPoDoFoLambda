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
const data_1 = require("./data");
const document_1 = require("./document");
const object_1 = require("./object");
const page_1 = require("./page");
const annotation_1 = require("./annotation");
const field_1 = require("./field");
const painter_1 = require("./painter");
const signer_1 = require("./signer");
const reference_1 = require("./reference");
const setup_1 = require("./setup");
const table_1 = require("./table");
exports.default = {
    Data: data_1.Data,
    Document: document_1.Document,
    FontEncoding: document_1.FontEncoding,
    Obj: object_1.Obj,
    Page: page_1.Page,
    Annotation: annotation_1.Annotation,
    NPDFAction: annotation_1.NPDFAction,
    NPDFAnnotation: annotation_1.NPDFAnnotation,
    NPDFAnnotationFlag: annotation_1.NPDFAnnotationFlag,
    NPDFAnnotationType: annotation_1.NPDFAnnotationType,
    CheckBox: field_1.CheckBox,
    Field: field_1.Field,
    TextField: field_1.TextField,
    ListBox: field_1.ListBox,
    ComboBox: field_1.ComboBox,
    Painter: painter_1.Painter,
    Encoding: painter_1.Encoding,
    ExtGState: painter_1.ExtGState,
    Font: painter_1.Font,
    NPDFAlignment: painter_1.NPDFAlignment,
    NPDFBlendMode: painter_1.NPDFBlendMode,
    NPDFColorSpace: painter_1.NPDFColorSpace,
    NPDFFontType: painter_1.NPDFFontType,
    NPDFLineCapStyle: painter_1.NPDFLineCapStyle,
    NPDFLineJoinStyle: painter_1.NPDFLineJoinStyle,
    NPDFRenderingIntent: painter_1.NPDFRenderingIntent,
    NPDFStokeStyle: painter_1.NPDFStokeStyle,
    NPDFTextRenderingMode: painter_1.NPDFTextRenderingMode,
    NPDFVerticalAlignment: painter_1.NPDFVerticalAlignment,
    Signer: signer_1.Signer,
    signature: signer_1.signature,
    Ref: reference_1.Ref,
    setup: setup_1.setup,
    Cell: table_1.Cell,
    Table: table_1.Table,
};
exports.CONVERSION = 0.0028346456693;
// export const Document = doc,
//     Page = page,
//     Obj = obj,
//     Annotation = annot,
//     NPdfAction = action,
//     NPdfAnnotation = annotenum,
//     NPdfAnnotationFlag = annotflags,
//     NPdfAnnotationType = annottype,
//     Field = field,
//     Form = form,
//     CheckBox = checkbox,
//     TextField = textfield,
//     ListBox = listbox,
//     ComboBox = combobox,
//     Image = image,
//     Painter = painter,
//     Rect = rect,
//     Signature = sign,
//     Stream = stream,
//     ContentsTokenizer = ct,
//# sourceMappingURL=index.js.map