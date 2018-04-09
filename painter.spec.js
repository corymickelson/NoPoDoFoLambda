"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const painter_1 = require("./painter");
const tap = require("tape");
const path_1 = require("path");
const document_1 = require("./document");
const index_1 = require("./index");
const rect_1 = require("./rect");
const table_1 = require("./table");
tap('Painter Api', sub => {
    const filePath = path_1.join(__dirname, '../test-documents/test.pdf'), outFile = '/tmp/painter.out.pdf', doc = new document_1.Document(filePath);
    doc.on('ready', pdf => {
        if (pdf instanceof Error)
            throw Error("doc ready error");
        const page = pdf.getPage(0), painter = new painter_1.Painter(doc, page), font = pdf.createFont({ fontName: 'monospace', encoding: document_1.FontEncoding.Identity });
        // TODO: Add correct assertions, will require parsing final doc for contents / resources objects
        sub.test('paint', t => {
            font.size = 16;
            painter.font = font;
            const metric = font.getMetrics();
            let x, y;
            x = index_1.CONVERSION * 10000;
            y = page.height - 10000 * index_1.CONVERSION;
            y -= metric.lineSpacing;
            t.doesNotThrow(() => painter.drawText({ x, y }, 'Test'));
            x = 0;
            let l, h, w, i;
            let msg = "Grayscale - Colospace";
            h = metric.lineSpacing;
            w = font.stringWidth(msg);
            y = page.height - 10000 * index_1.CONVERSION;
            t.doesNotThrow(() => painter.drawText({ x: 12000 * index_1.CONVERSION, y: y - h }, msg));
            let rect = new rect_1.Rect([12000 * index_1.CONVERSION, y - h, w, h]);
            painter.rectangle(rect);
            t.doesNotThrow(() => painter.stroke());
            let lineLength = 50000 * index_1.CONVERSION;
            for (let s = 0; s < 5; s++) {
                x += 10000 * index_1.CONVERSION;
                painter.setStrokeWidth((s * 1000) * index_1.CONVERSION);
                painter.setStrokingGrey(s / 10.0);
                t.doesNotThrow(() => painter.drawLine({ x, y }, { x, y: y - lineLength }));
            }
            const table = new table_1.Table(doc, 5, 5);
            painter.setColor([0.0, 0.0, 0.0]);
            table.font = font;
            table.foregroundColor = [0.0, 0.0, 0.0];
            for (let c = 0; c < 5; c++) {
                for (let r = 0; r < 5; r++) {
                    const cell = new table_1.Cell(table, c, r);
                    cell.text = 'A';
                }
            }
            table.tableWidth = 200;
            table.tableHeight = 200;
            t.doesNotThrow(() => table.draw({ x: 300, y: 300 }, painter));
            painter.finishPage();
            pdf.write((e, d) => {
                if (e instanceof Error)
                    t.fail();
                t.end();
            }, outFile);
        });
    });
});
//# sourceMappingURL=painter.spec.js.map