exports.handler = function (event, context, callback) {
    const { readdirSync } = require('fs')
    let files = readdirSync('/var/task/node_modules/nopodofo/lib')
    console.log(JSON.stringify(files, null, 2))
    const { npdf } = require('nopodofo')
    const { join } = require('path')


    let doc = new npdf.Document()
    doc.load(join(__dirname, './node_modules/nopodofo/spec/test-documents/test.pdf'), e => {
        if (e) callback(e)
        else {
            console.log(doc.getPageCount())
            let page = doc.getPage(0)
            console.log(page.fieldsCount())
            callback(null)
        }
    })
}