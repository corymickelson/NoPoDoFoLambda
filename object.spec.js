"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const document_1 = require("./document");
const test = require("tape");
const path_1 = require("path");
test('document objects instance of nopodofo.Obj', t => {
    const filePath = path_1.join(__dirname, '../test-documents/test.pdf'), doc = new document_1.Document(filePath);
    doc.on('ready', e => {
        if (e instanceof Error)
            t.fail();
        const objs = doc.getObjects();
        if (objs[1].type === 'Dictionary') {
            let nObj = objs[1].asObject(), ks = Object.keys(nObj);
            // t.assert((nObj as any)[ks[0]] instanceof Obj) 
            for (let key in nObj) {
                let x = nObj[key];
                t.assert(nObj[key] instanceof object_1.Obj, "object values are instance of Object");
            }
        }
        let streams = objs.filter((i) => i.hasStream());
        t.assert(streams.length > 0, 'objects streams available');
        t.assert(streams[0].stream instanceof Buffer, 'stream as Buffer');
        t.assert(objs[0] instanceof object_1.Obj, 'Objects array, instance of nopodofo.Obj');
        let found = false;
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].type === 'Dictionary') {
                let dictObj = objs[i].asObject();
                let refs = Object.values(dictObj).filter(v => v.type === 'Reference');
                if (refs.length > 0) {
                    let ref = refs[0].asReference();
                    if (!ref.isIndirect())
                        continue;
                    let refObj = ref.deRef(doc);
                    t.assert(refObj instanceof object_1.Obj, "Object ref types can dereference to object");
                    found = true;
                    break;
                }
            }
        }
        t.assert(found === true, "If streams are not found there is a problem");
        let dicts = objs.filter((i) => i.type === 'Dictionary'), dict = dicts[0].asObject();
        // t.assert(dict instanceof Dictionary, "Can get object as dictionary where type === Dictionary")
        let arrs = objs.filter((i) => i.type === 'Array'), arr = arrs[0].asArray();
        t.throws(() => arr.pop(), "This operation should fail since the underlying PdfArray is immutable");
        let arrObj = arr[0];
        t.assert(arrObj instanceof object_1.Obj, "Should return an Obj via array bracket getter notation");
        let keys = Object.keys(dict);
        t.assert(keys instanceof Array, 'keys instance of array');
        t.assert(keys.length > 0, 'keys not null or empty');
        t.assert(typeof keys[0] === 'string', 'keys contains string values');
        t.end();
    });
});
//# sourceMappingURL=object.spec.js.map