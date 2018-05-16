/// <reference types="node" />
import { IObj } from './object';
import { Page } from './page';
import { EncryptOption, IEncrypt, ProtectionOption } from './encrypt';
import { EventEmitter } from 'events';
import { IFont } from "./painter";
import { Signer } from './signer';
import { IRef } from "./reference";
import { IForm } from "./form";
export declare const __mod: any;
export declare type Callback = (err: Error, data: Buffer | string) => void;
export declare enum FontEncoding {
    WinAnsi = 1,
    Standard = 2,
    PdfDoc = 3,
    MacRoman = 4,
    MacExpert = 5,
    Symbol = 6,
    ZapfDingbats = 7,
    Win1250 = 8,
    Iso88592 = 9,
    Identity = 0,
}
export interface CreateFontOpts {
    fontName: string;
    bold?: boolean;
    italic?: boolean;
    encoding?: FontEncoding;
    embed?: boolean;
    fileName?: string;
}
/**
 * @class Document
 * @desc Document represents a PdfMemDocument, construct from an existing pdf document.
 * Document is the core class for reading and manipulating PDF files and writing them back to disk.
 * Document was designed to allow easy access to the object structure of a PDF file.
 * Document should be used whenever you want to change the object structure of a PDF file.
 */
export declare class Document extends EventEmitter {
    private readonly _instance;
    private _loaded;
    private _password;
    private _encrypt;
    readonly body: IObj[];
    readonly trailer: IObj;
    readonly catalog: IObj;
    readonly version: number;
    /**
     * @desc A Document has been read into memory
     * @returns {boolean}
     */
    readonly loaded: boolean;
    /**
     * @description If the document has an AcroForm Dictionary return the form as an instance of IForm.
     *      If there is not an AcroForm Dictionary for the document, doing a get on form will create an new
     *      empty AcroForm Dictionary.
     * @todo: Add configuration to disable creation of new form on form getter.
     */
    readonly form: IForm;
    password: string;
    readonly encrypt: IEncrypt;
    static gc(file: string, pwd: string, output: string, cb: (e: Error, d: string | Buffer) => void): void;
    /**
     * File is loaded asynchronously, extends eventEmitter, will publish a 'ready'event when document has been loaded
     * @constructor
     * @param {string} [file] - pdf file path (optional)
     * @param update
     * @param {string} [pwd] - document password
     * @returns void
     */
    constructor(file: string | Buffer, update?: boolean, pwd?: string);
    /**
     * @desc load pdf file, emits 'ready' || 'error' events
     * @param file - file path
     * @param update - load document for incremental updates
     * @param pwd
     */
    private load(file, update?, pwd?);
    getPageCount(): number;
    getPage(pageN: number): Page;
    /**
     * @desc Get an NoPoDoFo Obj from an indirect reference
     * @param {IRef} ref
     * @returns {IObj}
     */
    getObject(ref: IRef): IObj;
    /**
     * @description Append doc to the end of the loaded doc
     * @param {string} doc - pdf file path
     * @param password
     * @returns {Promise}
     */
    appendDocument(doc: string, password?: string): Promise<any>;
    splicePage(pageIndex: number): void;
    getVersion(): number;
    isLinearized(): boolean;
    /**
     * Persist changes and write to disk or if no arguments provided returns Buffer
     * @param {string|Function} output - optional, if provided, will try to write to file
     * @param {Function} [cb] - optional callback
     */
    write(output: Callback | string, cb?: Callback): void;
    isAllowed(protection: ProtectionOption): boolean;
    /**
     * @desc Creates a PdfFont instance for use in NoPoDoFo generated Pdf Document. Note
     *      it is up to the user to check that the specified font family exists on the system.
     *      For font management use font-manager
     * @see https://github.com/corymickelson/font-manager
     * @param {CreateFontOpts & Object} opts
     * @returns {Font}
     */
    createFont(opts: CreateFontOpts & Object): IFont;
    writeUpdate(device: string | Signer): void;
    createEncrypt(opts: EncryptOption): IEncrypt;
    getFont(identifier: string): IFont | null;
}
