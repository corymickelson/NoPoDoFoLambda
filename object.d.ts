/// <reference types="node" />
import { Ref, IRef } from "./reference";
import { Stream } from "stream";
import { NPDFDictionary } from "./dictionary";
export declare type NPDFInternal = any;
export declare type CoerceKeyType = 'boolean' | 'long' | 'name' | 'real';
export declare type PDType = 'Boolean' | 'Number' | 'Name' | 'Real' | 'String' | 'Array' | 'Dictionary' | 'Reference' | 'RawData';
export interface NArray {
    [key: number]: Obj;
    immutable: boolean;
    length: number;
    unshift: (...v: Array<Obj>) => number;
    push: (...v: Array<Obj>) => number;
    pop: () => Obj;
    shift: () => Obj;
}
export interface NObj {
    reference: number;
    length: number;
    stream: Stream;
    type: PDType;
    hasStream(): boolean;
    getOffset(key: string): Promise<number>;
    write(output: string, cb: Function): void;
    flateCompressStream(): void;
    delayedStreamLoad(): void;
    asBool(): boolean;
    asString(): string;
    asName(): string;
    asReal(): number;
    asNumber(): number;
    asArray(): NArray;
    asObject(): {
        [key: string]: Obj;
    };
    asReference(): Ref;
    asBuffer(): Buffer;
}
export interface IObj {
    reference: number;
    length: number;
    stream: Stream;
    type: PDType;
    immutable: boolean;
    hasStream(): boolean;
    getOffset(key: string): Promise<number>;
    write(output: string, cb: Function): void;
    flateCompressStream(): void;
    delayedStreamLoad(): void;
    getBool(): boolean;
    getDictionary(): NPDFDictionary;
    getString(): string;
    getName(): string;
    getReal(): number;
    getNumber(): number;
    getArray(): IArray;
    getReference(): IRef;
    getBuffer(): Buffer;
    clear(): void;
    eq(i: NPDFInternal): boolean;
}
export interface IArray {
    dirty: boolean;
    length: number;
    immutable: boolean;
    toJS(): Array<any>;
    at(i: number): IObj;
    pop(): IObj;
    clear(): void;
    push(v: Object): void;
    write(destination: string): void;
}
/**
 * @desc This class represents a PDF indirect Object in memory
 *      It is possible to manipulate the stream which can be appended to the
 * object(if the object is of underlying type dictionary) A PdfObject is
 * uniquely identified by an object number and generation number The object can
 * easily be written to a file using the write function
 *
 * @todo New instance object not yet supported. Objects can only be instantiated
 * from an existing object
 */
export declare class Obj implements NObj {
    private _instance;
    readonly reference: any;
    readonly length: any;
    readonly stream: any;
    readonly type: any;
    constructor(instance: any);
    hasStream(): boolean;
    /**
     * @desc Calculates the byte offset of key from the start of the object if the
     * object was written to disk at the moment of calling the function This
     * function is very calculation intensive!
     *
     * @param {string} key object dictionary key
     * @returns {number} - byte offset
     */
    getOffset(key: string): Promise<number>;
    write(output: string, cb: Function): void;
    /**
     * @desc This function compresses any currently set stream using the
     * FlateDecode algorithm. JPEG compressed streams will not be compressed again
     * using this function. Entries to the filter dictionary will be added if
     * necessary.
     */
    flateCompressStream(): void;
    /**
     * @desc Dynamically load this object and any associated stream from a PDF
     * file
     */
    delayedStreamLoad(): void;
    asBool(): boolean;
    asString(): string;
    asName(): string;
    asReal(): number;
    asNumber(): number;
    /**
     * The asArray method returns an Array Proxy (or an Object that is wrapped in a proxy that exposes methods similar to
     * an array, which modifies the underlying PdfArray Object). This is NOT an array, but provides a data structure
     * as close to an array as possible to help user's view/modify the data. If a method or property is not supported
     * a console message will be provided.
     * @returns {Array<Obj>}
     */
    asArray(): NArray;
    asObject(): {
        [key: string]: Obj;
    };
    asReference(): Ref;
    asBuffer(): Buffer;
    /**
     *
     * @param internal - NPDFInternal Dictionary
     */
    static objProxy(internal: NPDFInternal): {
        [key: string]: Obj;
    };
}
