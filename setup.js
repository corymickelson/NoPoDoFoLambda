"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setup() {
    const libSource = `${process.env['LAMBDA_TASK_ROOT']}/node_modules/commonpdf_podofo`;
    process.env['PATH'] = `${process.env['PATH']}:${libSource}`;
    process.env['LD_LIBRARY_PATH'] = `${process.env['LD_LIBRARY_PATH']}:${libSource}`;
}
exports.setup = setup;
//# sourceMappingURL=setup.js.map