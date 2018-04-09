"use strict";
function setup(event, context, cb) {
    const libSource = `${process.env['LAMBDA_TASK_ROOT']}/lib`;
    process.env['PATH'] = `${process.env['PATH']}:${libSource}`;
    process.env['LD_LIBRARY_PATH'] = `${process.env['LD_LIBRARY_PATH']}:${libSource}`;
    // const mod = require('./lib/npdf.node')
}
exports.setup= setup;
