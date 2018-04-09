"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const rect_1 = require("./rect");
var NPDFStokeStyle;
(function (NPDFStokeStyle) {
    NPDFStokeStyle[NPDFStokeStyle["Solid"] = 0] = "Solid";
    NPDFStokeStyle[NPDFStokeStyle["Dash"] = 1] = "Dash";
    NPDFStokeStyle[NPDFStokeStyle["Dot"] = 2] = "Dot";
    NPDFStokeStyle[NPDFStokeStyle["DashDot"] = 3] = "DashDot";
    NPDFStokeStyle[NPDFStokeStyle["DashDotDot"] = 4] = "DashDotDot";
})(NPDFStokeStyle = exports.NPDFStokeStyle || (exports.NPDFStokeStyle = {}));
var NPDFFontType;
(function (NPDFFontType) {
    NPDFFontType[NPDFFontType["TrueType"] = 0] = "TrueType";
    NPDFFontType[NPDFFontType["Type1Pfa"] = 1] = "Type1Pfa";
    NPDFFontType[NPDFFontType["Type1Pfb"] = 2] = "Type1Pfb";
    NPDFFontType[NPDFFontType["Type1Base14"] = 3] = "Type1Base14";
    NPDFFontType[NPDFFontType["Type3"] = 4] = "Type3";
})(NPDFFontType = exports.NPDFFontType || (exports.NPDFFontType = {}));
var NPDFColorSpace;
(function (NPDFColorSpace) {
    NPDFColorSpace[NPDFColorSpace["DeviceGray"] = 0] = "DeviceGray";
    NPDFColorSpace[NPDFColorSpace["DeviceRGB"] = 1] = "DeviceRGB";
    NPDFColorSpace[NPDFColorSpace["DeviceCMYK"] = 2] = "DeviceCMYK";
    NPDFColorSpace[NPDFColorSpace["Separation"] = 3] = "Separation";
    NPDFColorSpace[NPDFColorSpace["CieLab"] = 4] = "CieLab";
    NPDFColorSpace[NPDFColorSpace["Indexed"] = 5] = "Indexed";
})(NPDFColorSpace = exports.NPDFColorSpace || (exports.NPDFColorSpace = {}));
var NPDFTextRenderingMode;
(function (NPDFTextRenderingMode) {
    NPDFTextRenderingMode[NPDFTextRenderingMode["Fill"] = 0] = "Fill";
    NPDFTextRenderingMode[NPDFTextRenderingMode["Stroke"] = 1] = "Stroke";
    NPDFTextRenderingMode[NPDFTextRenderingMode["FillAndStroke"] = 2] = "FillAndStroke";
    NPDFTextRenderingMode[NPDFTextRenderingMode["Invisible"] = 3] = "Invisible";
    NPDFTextRenderingMode[NPDFTextRenderingMode["FillToClipPath"] = 4] = "FillToClipPath";
    NPDFTextRenderingMode[NPDFTextRenderingMode["StrokeToClipPath"] = 5] = "StrokeToClipPath";
    NPDFTextRenderingMode[NPDFTextRenderingMode["FillAndStrokeToClipPath"] = 6] = "FillAndStrokeToClipPath";
    NPDFTextRenderingMode[NPDFTextRenderingMode["ToClipPath"] = 7] = "ToClipPath";
})(NPDFTextRenderingMode = exports.NPDFTextRenderingMode || (exports.NPDFTextRenderingMode = {}));
var NPDFLineCapStyle;
(function (NPDFLineCapStyle) {
    NPDFLineCapStyle[NPDFLineCapStyle["Butt"] = 0] = "Butt";
    NPDFLineCapStyle[NPDFLineCapStyle["Round"] = 1] = "Round";
    NPDFLineCapStyle[NPDFLineCapStyle["Square"] = 2] = "Square";
})(NPDFLineCapStyle = exports.NPDFLineCapStyle || (exports.NPDFLineCapStyle = {}));
var NPDFLineJoinStyle;
(function (NPDFLineJoinStyle) {
    NPDFLineJoinStyle[NPDFLineJoinStyle["Miter"] = 0] = "Miter";
    NPDFLineJoinStyle[NPDFLineJoinStyle["Round"] = 1] = "Round";
    NPDFLineJoinStyle[NPDFLineJoinStyle["Bevel"] = 2] = "Bevel";
})(NPDFLineJoinStyle = exports.NPDFLineJoinStyle || (exports.NPDFLineJoinStyle = {}));
var NPDFVerticalAlignment;
(function (NPDFVerticalAlignment) {
    NPDFVerticalAlignment[NPDFVerticalAlignment["Top"] = 0] = "Top";
    NPDFVerticalAlignment[NPDFVerticalAlignment["Center"] = 1] = "Center";
    NPDFVerticalAlignment[NPDFVerticalAlignment["Bottom"] = 2] = "Bottom";
})(NPDFVerticalAlignment = exports.NPDFVerticalAlignment || (exports.NPDFVerticalAlignment = {}));
var NPDFAlignment;
(function (NPDFAlignment) {
    NPDFAlignment[NPDFAlignment["Left"] = 0] = "Left";
    NPDFAlignment[NPDFAlignment["Center"] = 1] = "Center";
    NPDFAlignment[NPDFAlignment["Bottom"] = 2] = "Bottom";
})(NPDFAlignment = exports.NPDFAlignment || (exports.NPDFAlignment = {}));
class Painter {
    get page() {
        return this._instance.page;
    }
    set page(value) {
        this._instance.page = value._instance;
    }
    get tabWidth() {
        return this._instance.tabWidth;
    }
    set tabWidth(value) {
        this._instance.tabWidth = value;
    }
    get canvas() {
        return this._instance.canvas;
    }
    get font() {
        const instance = this._instance.font;
        return new Font(instance);
    }
    set font(font) {
        this._instance.font = font._instance;
    }
    get precision() {
        return this._instance.precision;
    }
    set precision(value) {
        this._instance.precision = value;
    }
    constructor(doc, page) {
        this._instance = new document_1.__mod.Painter(doc._instance);
        if (page)
            this._instance.page = page._instance;
    }
    setColor(rgb) {
        this._instance.setColor(rgb);
    }
    setStrokeWidth(w) {
        this._instance.setStrokeWidth(w);
    }
    setGrey(v) {
        if (v < 0.0 || v > 1.0) {
            throw RangeError('grey value must be between 0 and 1');
        }
        this._instance.setGrey(v);
    }
    setStrokingGrey(v) {
        if (v < 0.0 || v > 1.0) {
            throw RangeError('grey value must be between 0 and 1');
        }
        this._instance.setStrokingGrey(v);
    }
    setColorCMYK(cmyk) {
        this._instance.setColorCMYK(cmyk);
    }
    setStrokingColorCMYK(cmyk) {
        this._instance.setStrokingColorCMYK(cmyk);
    }
    setStrokeStyle(style) {
        this._instance.setStrokeStyle(style);
    }
    setLineCapStyle(style) {
        this._instance.setLineCapStyle(style);
    }
    setLineJoinStyle(style) {
        this._instance.setLineJoinStyle(style);
    }
    setClipRect(rect) {
        if (rect instanceof rect_1.Rect) {
            this._instance.setClipRect(rect._instance);
        }
        else
            throw TypeError('clip rect requires argument type Rect');
    }
    setMiterLimit(v) {
        this._instance.setMiterLimit(v);
    }
    rectangle(rect) {
        if (rect instanceof rect_1.Rect) {
            this._instance.rectangle(rect._instance);
        }
        else
            throw TypeError('rectangle requires argument type Rect');
    }
    ellipse(points) {
        this._instance.ellipse(points);
    }
    circle(points) {
        this._instance.circle(points);
    }
    closePath() {
        this._instance.closePath();
    }
    lineTo(point) {
        this._instance.lineTo(point);
    }
    moveTo(point) {
        this._instance.moveTo(point);
    }
    cubicBezierTo(p1, p2, p3) {
        this._instance.cubicBezierTo(p1, p2, p3);
    }
    horizontalLineTo(v) {
        this._instance.horizontalLineTo(v);
    }
    verticalLineTo(v) {
        this._instance.verticalLineTo(v);
    }
    smoothCurveTo(p1, p2) {
        this._instance.smoothCurveTo(p1, p2);
    }
    quadCurveTo(p1, p2) {
        this._instance.quadCurveTo(p1, p2);
    }
    arcTo(p1, p2, rotation, large = false, sweep = false) {
        this._instance.arcTo(p1, p2, rotation, large, sweep);
    }
    close() {
        this._instance.close();
    }
    stroke() {
        this._instance.stroke();
    }
    fill() {
        this._instance.fill();
    }
    strokeAndFill() {
        this._instance.strokeAndFill();
    }
    endPath() {
        this._instance.endPath();
    }
    clip() {
        this._instance.clip();
    }
    save() {
        this._instance.save();
    }
    restore() {
        this._instance.restore();
    }
    setExtGState(state) {
        this._instance.setExtGState(state);
    }
    getCurrentPath() {
        return this._instance.getCurrentPath();
    }
    drawLine(p1, p2) {
        this._instance.drawLine(p1, p2);
    }
    drawText(point, text) {
        this._instance.drawText(point, text);
    }
    drawTextAligned(point, text, alignment) {
        this._instance.drawTextAligned(point, text, alignment);
    }
    getMultiLineText(width, text, skipSpaces = false) {
        return this._instance.getMultiLineText(width, text, skipSpaces);
    }
    bt(point) {
        this._instance.beginText(point);
    }
    et() {
        this._instance.endText();
    }
    addText(text) {
        this._instance.addText(text);
    }
    moveTextPosition(point) {
        this._instance.moveTextPosition(point);
    }
    drawGlyph(point, glyph) {
        this._instance.drawGlyph(point, glyph);
    }
    finishPage() {
        this._instance.finishPage();
    }
    /**
     *
     * @param {Image} img - an instance of Image
     * @param {number} x - x coordinate (bottom left position of image)
     * @param {number} y - y coordinate (bottom position of image)
     * @param {{width:number, heigth:number}} scale - optional scaling
     */
    drawImage(img, x, y, scale) {
        scale ?
            this._instance.drawImage(img._instance, x, y, scale.width, scale.height) :
            this._instance.drawImage(img._instance, x, y);
    }
}
exports.Painter = Painter;
class Font {
    constructor(_instance) {
        this._instance = _instance;
    }
    get size() {
        return this._instance.size;
    }
    set size(value) {
        this._instance.size = value;
    }
    get scale() {
        return this._instance.scale;
    }
    set scale(value) {
        this._instance.scale = value;
    }
    get charSpace() {
        return this._instance.charSpace;
    }
    set(value) {
        this._instance.charSpace = value;
    }
    get wordSpace() {
        return this._instance.wordSpace;
    }
    set wordSpace(value) {
        this._instance.wordSpace = value;
    }
    get underline() {
        return this._instance.underline;
    }
    set underline(value) {
        this._instance.underline = value;
    }
    get strikeOut() {
        return this._instance.strikeOut;
    }
    set strikeOut(value) {
        this._instance.strikeOut = value;
    }
    isBold() {
        return this._instance.isBold();
    }
    isItalic() {
        return this._instance.isItalic();
    }
    getIdentifier() {
        return this._instance.getIdentifier();
    }
    getEncoding() {
        const instance = this._instance.getEncoding();
        return new Encoding(instance);
    }
    getMetrics() {
        return this._instance.getMetrics();
    }
    stringWidth(v) {
        return this._instance.stringWidth(v);
    }
    write(content, stream) {
        this._instance.write(content, stream._instance);
    }
    embed() {
        this._instance.embed();
    }
}
exports.Font = Font;
class Encoding {
    constructor(_instance) {
        this._instance = _instance;
    }
    addToDictionary(target) {
        this._instance.addToDictionary(target);
    }
    convertToUnicode(content, font) {
        return this._instance.convertToUnicode(content, font._instance);
    }
    convertToEncoding(content, font) {
        return this._instance.convertToEncoding(content, font._instance);
    }
}
exports.Encoding = Encoding;
var NPDFBlendMode;
(function (NPDFBlendMode) {
    NPDFBlendMode["Normal"] = "Normal";
    NPDFBlendMode["Multiply"] = "Multiply";
    NPDFBlendMode["Screen"] = "Screen";
    NPDFBlendMode["Overlay"] = "Overlay";
    NPDFBlendMode["Darken"] = "Darken";
    NPDFBlendMode["Lighten"] = "Lighten";
    NPDFBlendMode["ColorDodge"] = "ColorDodge";
    NPDFBlendMode["ColorBurn"] = "ColorBurn";
    NPDFBlendMode["HardLight"] = "HardLight";
    NPDFBlendMode["SoftLight"] = "SoftLight";
    NPDFBlendMode["Difference"] = "Difference";
    NPDFBlendMode["Exclusion"] = "Exclusion";
    NPDFBlendMode["Hue"] = "Hue";
    NPDFBlendMode["Saturation"] = "Saturation";
    NPDFBlendMode["Color"] = "Color";
    NPDFBlendMode["Luminosity"] = "Luminosity";
})(NPDFBlendMode = exports.NPDFBlendMode || (exports.NPDFBlendMode = {}));
var NPDFRenderingIntent;
(function (NPDFRenderingIntent) {
    NPDFRenderingIntent["AbsoluteColorimetric"] = "AbsoluteColorimetric";
    NPDFRenderingIntent["RelativeColorimetric"] = "RelativeColorimetric";
    NPDFRenderingIntent["Perceptual"] = "Perceptual";
    NPDFRenderingIntent["Saturation"] = "Saturation";
})(NPDFRenderingIntent = exports.NPDFRenderingIntent || (exports.NPDFRenderingIntent = {}));
class ExtGState {
    constructor(_instance) {
        this._instance = _instance;
    }
    setFillOpacity(v) {
        this._instance.setFillOpacity(v);
    }
    setBlendMode(mode) {
        this._instance.setBlendMode(mode);
    }
    setOverprint(v) {
        this._instance.setOverprint(v);
    }
    setFillOverprint(v) {
        this._instance.setFillOverprint(v);
    }
    setStrokeOpacity(v) {
        this._instance.setStrokeOpacity(v);
    }
    setStrokeOverprint(v) {
        this._instance.setStrokeOverprint(v);
    }
    setNonZeroOverprint(v) {
        this._instance.setNonZeroOverprint(v);
    }
    setRenderingIntent(intent) {
        this._instance.setRenderingIntent(intent);
    }
    setFrequency(v) {
        this._instance.setFrequency(v);
    }
}
exports.ExtGState = ExtGState;
//# sourceMappingURL=painter.js.map