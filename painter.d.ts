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
import { IPage } from './page';
import { Image } from './image';
import { Stream } from './stream';
import { Document } from './document';
import { Rect } from "./rect";
import { NPDFPoint } from "./painter";
import { Obj } from './object';
export declare type NPDFcmyk = [number, number, number, number];
export declare type NPDFrgb = [number, number, number];
export declare type NPDFGrayScale = number;
export declare type NPDFColor = NPDFrgb | NPDFcmyk | NPDFGrayScale;
export declare type NPDFPoint = {
    x: number;
    y: number;
};
export declare enum NPDFStokeStyle {
    Solid = 0,
    Dash = 1,
    Dot = 2,
    DashDot = 3,
    DashDotDot = 4,
}
export declare enum NPDFFontType {
    TrueType = 0,
    Type1Pfa = 1,
    Type1Pfb = 2,
    Type1Base14 = 3,
    Type3 = 4,
}
export declare enum NPDFColorSpace {
    DeviceGray = 0,
    DeviceRGB = 1,
    DeviceCMYK = 2,
    Separation = 3,
    CieLab = 4,
    Indexed = 5,
}
export declare enum NPDFTextRenderingMode {
    Fill = 0,
    Stroke = 1,
    FillAndStroke = 2,
    Invisible = 3,
    FillToClipPath = 4,
    StrokeToClipPath = 5,
    FillAndStrokeToClipPath = 6,
    ToClipPath = 7,
}
export declare enum NPDFLineCapStyle {
    Butt = 0,
    Round = 1,
    Square = 2,
}
export declare enum NPDFLineJoinStyle {
    Miter = 0,
    Round = 1,
    Bevel = 2,
}
export declare enum NPDFVerticalAlignment {
    Top = 0,
    Center = 1,
    Bottom = 2,
}
export declare enum NPDFAlignment {
    Left = 0,
    Center = 1,
    Bottom = 2,
}
export declare class Painter {
    private _instance;
    page: IPage;
    tabWidth: number;
    readonly canvas: Stream;
    font: Font;
    precision: number;
    constructor(doc: Document, page?: IPage);
    setColor(rgb: NPDFrgb): void;
    setStrokeWidth(w: number): void;
    setGrey(v: number): void;
    setStrokingGrey(v: number): void;
    setColorCMYK(cmyk: NPDFcmyk): void;
    setStrokingColorCMYK(cmyk: NPDFcmyk): void;
    setStrokeStyle(style: NPDFStokeStyle): void;
    setLineCapStyle(style: NPDFLineCapStyle): void;
    setLineJoinStyle(style: NPDFLineJoinStyle): void;
    setClipRect(rect: Rect): void;
    setMiterLimit(v: number): void;
    rectangle(rect: Rect): void;
    ellipse(points: NPDFPoint & {
        width: number;
        height: number;
    }): void;
    circle(points: NPDFPoint & {
        radius: number;
    }): void;
    closePath(): void;
    lineTo(point: NPDFPoint): void;
    moveTo(point: NPDFPoint): void;
    cubicBezierTo(p1: NPDFPoint, p2: NPDFPoint, p3: NPDFPoint): void;
    horizontalLineTo(v: number): void;
    verticalLineTo(v: number): void;
    smoothCurveTo(p1: NPDFPoint, p2: NPDFPoint): void;
    quadCurveTo(p1: NPDFPoint, p2: NPDFPoint): void;
    arcTo(p1: NPDFPoint, p2: NPDFPoint, rotation: number, large?: boolean, sweep?: boolean): void;
    close(): void;
    stroke(): void;
    fill(): void;
    strokeAndFill(): void;
    endPath(): void;
    clip(): void;
    save(): void;
    restore(): void;
    setExtGState(state: ExtGState): void;
    getCurrentPath(): string;
    drawLine(p1: NPDFPoint, p2: NPDFPoint): void;
    drawText(point: NPDFPoint, text: string): void;
    drawTextAligned(point: NPDFPoint, text: string, alignment: NPDFAlignment): void;
    getMultiLineText(width: number, text: string, skipSpaces?: boolean): Array<string>;
    bt(point: NPDFPoint): void;
    et(): void;
    addText(text: string): void;
    moveTextPosition(point: NPDFPoint): void;
    drawGlyph(point: NPDFPoint, glyph: string): void;
    finishPage(): void;
    /**
     *
     * @param {Image} img - an instance of Image
     * @param {number} x - x coordinate (bottom left position of image)
     * @param {number} y - y coordinate (bottom position of image)
     * @param {{width:number, heigth:number}} scale - optional scaling
     */
    drawImage(img: Image, x: number, y: number, scale?: {
        width: number;
        height: number;
    }): void;
}
export interface FontMetrics {
    lineSpacing: number;
    underlineThickness: number;
    underlinePosition: number;
    strikeOutThickness: number;
    strikeOutPosition: number;
    fileName: string;
    fontData: string;
    fontWeight: number;
    fontSize: number;
    fontScale: number;
    charSpace: number;
    wordSpace: number;
    fontType?: string;
}
export declare class Font {
    private _instance;
    size: number;
    scale: number;
    readonly charSpace: any;
    set(value: number): void;
    wordSpace: number;
    underline: boolean;
    strikeOut: boolean;
    constructor(_instance: any);
    isBold(): boolean;
    isItalic(): boolean;
    getIdentifier(): string;
    getEncoding(): Encoding;
    getMetrics(): FontMetrics;
    stringWidth(v: string): number;
    write(content: string, stream: Stream): void;
    embed(): void;
}
export declare class Encoding {
    private _instance;
    constructor(_instance: any);
    addToDictionary(target: {
        [key: string]: Obj;
    }): void;
    convertToUnicode(content: string, font: Font): string;
    convertToEncoding(content: string, font: Font): Buffer;
}
export declare enum NPDFBlendMode {
    Normal = "Normal",
    Multiply = "Multiply",
    Screen = "Screen",
    Overlay = "Overlay",
    Darken = "Darken",
    Lighten = "Lighten",
    ColorDodge = "ColorDodge",
    ColorBurn = "ColorBurn",
    HardLight = "HardLight",
    SoftLight = "SoftLight",
    Difference = "Difference",
    Exclusion = "Exclusion",
    Hue = "Hue",
    Saturation = "Saturation",
    Color = "Color",
    Luminosity = "Luminosity",
}
export declare enum NPDFRenderingIntent {
    AbsoluteColorimetric = "AbsoluteColorimetric",
    RelativeColorimetric = "RelativeColorimetric",
    Perceptual = "Perceptual",
    Saturation = "Saturation",
}
export declare class ExtGState {
    private _instance;
    constructor(_instance: any);
    setFillOpacity(v: number): void;
    setBlendMode(mode: NPDFBlendMode): void;
    setOverprint(v: boolean): void;
    setFillOverprint(v: boolean): void;
    setStrokeOpacity(v: number): void;
    setStrokeOverprint(v: boolean): void;
    setNonZeroOverprint(v: boolean): void;
    setRenderingIntent(intent: NPDFRenderingIntent): void;
    setFrequency(v: number): void;
}
