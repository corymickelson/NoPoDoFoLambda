"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const constants_1 = require("constants");
var NPDFAnnotationType;
(function (NPDFAnnotationType) {
    NPDFAnnotationType["Text"] = "Text";
    NPDFAnnotationType["Link"] = "Link";
    NPDFAnnotationType["FreeText"] = "FreeText";
    NPDFAnnotationType["Line"] = "Line";
    NPDFAnnotationType["Square"] = "Square";
    NPDFAnnotationType["Circle"] = "Circle";
    NPDFAnnotationType["Polygon"] = "Polygon";
    NPDFAnnotationType["PolyLine"] = "PolyLine";
    NPDFAnnotationType["Highlight"] = "Highlight";
    NPDFAnnotationType["Underline"] = "Underline";
    NPDFAnnotationType["Squiggly"] = "Squiggly";
    NPDFAnnotationType["StrikeOut"] = "StrikeOut";
    NPDFAnnotationType["Stamp"] = "Stamp";
    NPDFAnnotationType["Caret"] = "Caret";
    NPDFAnnotationType["Ink"] = "Ink";
    NPDFAnnotationType["Popup"] = "Popup";
    NPDFAnnotationType["FileAttachment"] = "FileAttachment";
    NPDFAnnotationType["Sound"] = "Sound";
    NPDFAnnotationType["Movie"] = "Movie";
    NPDFAnnotationType["Widget"] = "Widget";
    NPDFAnnotationType["Screen"] = "Screen";
    NPDFAnnotationType["PrinterMark"] = "PrinterMark";
    NPDFAnnotationType["TrapNet"] = "TrapNet";
    NPDFAnnotationType["Watermark"] = "Watermark";
    NPDFAnnotationType["_3D"] = "3D";
    NPDFAnnotationType["RichMedia"] = "RichMedia";
    NPDFAnnotationType["WebMedia"] = "WebMedia";
})(NPDFAnnotationType = exports.NPDFAnnotationType || (exports.NPDFAnnotationType = {}));
var NPDFAnnotation;
(function (NPDFAnnotation) {
    NPDFAnnotation[NPDFAnnotation["Text"] = 0] = "Text";
    NPDFAnnotation[NPDFAnnotation["Link"] = 1] = "Link";
    NPDFAnnotation[NPDFAnnotation["FreeText"] = 2] = "FreeText";
    NPDFAnnotation[NPDFAnnotation["Line"] = 3] = "Line";
    NPDFAnnotation[NPDFAnnotation["Square"] = 4] = "Square";
    NPDFAnnotation[NPDFAnnotation["Circle"] = 5] = "Circle";
    NPDFAnnotation[NPDFAnnotation["Polygon"] = 6] = "Polygon";
    NPDFAnnotation[NPDFAnnotation["PolyLine"] = 7] = "PolyLine";
    NPDFAnnotation[NPDFAnnotation["Highlight"] = 8] = "Highlight";
    NPDFAnnotation[NPDFAnnotation["Underline"] = 9] = "Underline";
    NPDFAnnotation[NPDFAnnotation["Squiggly"] = 10] = "Squiggly";
    NPDFAnnotation[NPDFAnnotation["StrikeOut"] = 11] = "StrikeOut";
    NPDFAnnotation[NPDFAnnotation["Stamp"] = 12] = "Stamp";
    NPDFAnnotation[NPDFAnnotation["Caret"] = 13] = "Caret";
    NPDFAnnotation[NPDFAnnotation["Ink"] = 14] = "Ink";
    NPDFAnnotation[NPDFAnnotation["Popup"] = 15] = "Popup";
    NPDFAnnotation[NPDFAnnotation["FileAttachement"] = 16] = "FileAttachement";
    NPDFAnnotation[NPDFAnnotation["Sound"] = 17] = "Sound";
    NPDFAnnotation[NPDFAnnotation["Movie"] = 18] = "Movie";
    NPDFAnnotation[NPDFAnnotation["Widget"] = 19] = "Widget";
    NPDFAnnotation[NPDFAnnotation["Screen"] = 20] = "Screen";
    NPDFAnnotation[NPDFAnnotation["PrinterMark"] = 21] = "PrinterMark";
    NPDFAnnotation[NPDFAnnotation["TrapNet"] = 22] = "TrapNet";
    NPDFAnnotation[NPDFAnnotation["Watermark"] = 23] = "Watermark";
    NPDFAnnotation[NPDFAnnotation["_3D"] = 24] = "_3D";
    NPDFAnnotation[NPDFAnnotation["RichMedia"] = 25] = "RichMedia";
    NPDFAnnotation[NPDFAnnotation["WebMedia"] = 26] = "WebMedia";
})(NPDFAnnotation = exports.NPDFAnnotation || (exports.NPDFAnnotation = {}));
var NPDFAnnotationFlag;
(function (NPDFAnnotationFlag) {
    NPDFAnnotationFlag[NPDFAnnotationFlag["Invisible"] = 1] = "Invisible";
    NPDFAnnotationFlag[NPDFAnnotationFlag["Hidden"] = 2] = "Hidden";
    NPDFAnnotationFlag[NPDFAnnotationFlag["Print"] = 4] = "Print";
    NPDFAnnotationFlag[NPDFAnnotationFlag["NoZoom"] = 8] = "NoZoom";
    NPDFAnnotationFlag[NPDFAnnotationFlag["NoRotate"] = 16] = "NoRotate";
    NPDFAnnotationFlag[NPDFAnnotationFlag["NoView"] = 32] = "NoView";
    NPDFAnnotationFlag[NPDFAnnotationFlag["ReadOnly"] = 64] = "ReadOnly";
    NPDFAnnotationFlag[NPDFAnnotationFlag["Locked"] = 128] = "Locked";
    NPDFAnnotationFlag[NPDFAnnotationFlag["ToggleNoView"] = 256] = "ToggleNoView";
    NPDFAnnotationFlag[NPDFAnnotationFlag["LockedContents"] = 512] = "LockedContents";
})(NPDFAnnotationFlag = exports.NPDFAnnotationFlag || (exports.NPDFAnnotationFlag = {}));
var NPDFAction;
(function (NPDFAction) {
    NPDFAction[NPDFAction["GoTo"] = 0] = "GoTo";
    NPDFAction[NPDFAction["GoToR"] = 1] = "GoToR";
    NPDFAction[NPDFAction["GoToE"] = 2] = "GoToE";
    NPDFAction[NPDFAction["Launch"] = 3] = "Launch";
    NPDFAction[NPDFAction["Thread"] = 4] = "Thread";
    NPDFAction[NPDFAction["URI"] = 5] = "URI";
    NPDFAction[NPDFAction["Sound"] = 6] = "Sound";
    NPDFAction[NPDFAction["Movie"] = 7] = "Movie";
    NPDFAction[NPDFAction["Hide"] = 8] = "Hide";
    NPDFAction[NPDFAction["Named"] = 9] = "Named";
    NPDFAction[NPDFAction["SubmitForm"] = 10] = "SubmitForm";
    NPDFAction[NPDFAction["ResetForm"] = 11] = "ResetForm";
    NPDFAction[NPDFAction["ImportData"] = 12] = "ImportData";
    NPDFAction[NPDFAction["JavaScript"] = 13] = "JavaScript";
    NPDFAction[NPDFAction["SetOCGState"] = 14] = "SetOCGState";
    NPDFAction[NPDFAction["Rendition"] = 15] = "Rendition";
    NPDFAction[NPDFAction["Trans"] = 16] = "Trans";
    NPDFAction[NPDFAction["GoTo3DView"] = 17] = "GoTo3DView";
    NPDFAction[NPDFAction["RichMediaExecute"] = 18] = "RichMediaExecute";
})(NPDFAction = exports.NPDFAction || (exports.NPDFAction = {}));
/**
 * @desc Red, Green, Blue
 */
class Annotation {
    constructor(_instance) {
        this._instance = _instance;
    }
    get quadPoints() {
        return this._instance.quadPoints;
    }
    set quadPoints(value) {
        this._instance.quadPoints = value;
    }
    get title() {
        return this._instance.title;
    }
    set title(value) {
        this._instance.title = value;
    }
    get flag() {
        return this._instance.flag;
    }
    set flag(value) {
        this._instance.flag = value;
    }
    get color() {
        return this._instance.color;
    }
    set color(value) {
        let rgbErr = Error("RGB value must be an integer >= 0 || <= 256");
        if (value.length !== 3) {
            throw rgbErr;
        }
        value.forEach(e => {
            if (Number.isInteger(e) === false) {
                throw rgbErr;
            }
            if (Number.isNaN(e)) {
                throw rgbErr;
            }
        });
        this._instance.color = value;
    }
    hasAppearanceStream() {
        return this._instance.hasAppearanceStream();
    }
    setBorderStyle(horizontalRadius, verticalRadius, width) {
        return this._instance.setBorderStyle(horizontalRadius, verticalRadius, width);
    }
    hasDestination() {
        return this._instance.hasDestination();
    }
    hasAction() {
        return this._instance.hasAction();
    }
    getType() {
        return this._instance.getType();
    }
    setFileAttachment(filename, embed = true) {
        fs_1.access(filename, constants_1.F_OK | constants_1.R_OK, err => {
            if (err)
                throw Error("File not found");
            this._instance.setFileAttachment(filename, embed);
        });
    }
    hasFileAttachment() {
        return this._instance.hasFileAttachment();
    }
}
exports.Annotation = Annotation;
//# sourceMappingURL=annotation.js.map