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
import { NPDFrgb } from './painter';
export declare enum NPDFAnnotationType {
    Text = "Text",
    Link = "Link",
    FreeText = "FreeText",
    Line = "Line",
    Square = "Square",
    Circle = "Circle",
    Polygon = "Polygon",
    PolyLine = "PolyLine",
    Highlight = "Highlight",
    Underline = "Underline",
    Squiggly = "Squiggly",
    StrikeOut = "StrikeOut",
    Stamp = "Stamp",
    Caret = "Caret",
    Ink = "Ink",
    Popup = "Popup",
    FileAttachment = "FileAttachment",
    Sound = "Sound",
    Movie = "Movie",
    Widget = "Widget",
    Screen = "Screen",
    PrinterMark = "PrinterMark",
    TrapNet = "TrapNet",
    Watermark = "Watermark",
    _3D = "3D",
    RichMedia = "RichMedia",
    WebMedia = "WebMedia",
}
export declare enum NPDFAnnotation {
    Text = 0,
    Link = 1,
    FreeText = 2,
    Line = 3,
    Square = 4,
    Circle = 5,
    Polygon = 6,
    PolyLine = 7,
    Highlight = 8,
    Underline = 9,
    Squiggly = 10,
    StrikeOut = 11,
    Stamp = 12,
    Caret = 13,
    Ink = 14,
    Popup = 15,
    FileAttachement = 16,
    Sound = 17,
    Movie = 18,
    Widget = 19,
    Screen = 20,
    PrinterMark = 21,
    TrapNet = 22,
    Watermark = 23,
    _3D = 24,
    RichMedia = 25,
    WebMedia = 26,
}
export declare enum NPDFAnnotationFlag {
    Invisible = 1,
    Hidden = 2,
    Print = 4,
    NoZoom = 8,
    NoRotate = 16,
    NoView = 32,
    ReadOnly = 64,
    Locked = 128,
    ToggleNoView = 256,
    LockedContents = 512,
}
export declare enum NPDFAction {
    GoTo = 0,
    GoToR = 1,
    GoToE = 2,
    Launch = 3,
    Thread = 4,
    URI = 5,
    Sound = 6,
    Movie = 7,
    Hide = 8,
    Named = 9,
    SubmitForm = 10,
    ResetForm = 11,
    ImportData = 12,
    JavaScript = 13,
    SetOCGState = 14,
    Rendition = 15,
    Trans = 16,
    GoTo3DView = 17,
    RichMediaExecute = 18,
}
/**
 * @desc Red, Green, Blue
 */
export declare class Annotation {
    private _instance;
    quadPoints: Array<number>;
    title: string;
    flag: NPDFAnnotationFlag;
    color: NPDFrgb;
    constructor(_instance: any);
    hasAppearanceStream(): boolean;
    setBorderStyle(horizontalRadius: number, verticalRadius: number, width: number): void;
    hasDestination(): boolean;
    hasAction(): boolean;
    getType(): NPDFAnnotationType;
    setFileAttachment(filename: string, embed?: boolean): void;
    hasFileAttachment(): boolean;
}
