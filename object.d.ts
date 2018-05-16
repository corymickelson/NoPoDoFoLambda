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
import { IRef } from "./reference";
import { Stream } from "stream";
import { IDictionary } from "./object";
import { IObj } from "./object";
import { Document } from "./document";
export declare type NPDFInternal = any;
export declare type CoerceKeyType = 'boolean' | 'long' | 'name' | 'real';
export declare type PDType = 'Boolean' | 'Number' | 'Name' | 'Real' | 'String' | 'Array' | 'Dictionary' | 'Reference' | 'RawData';
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
    getDictionary(): IDictionary;
    getString(): string;
    getName(): string;
    getReal(): number;
    getNumber(): number;
    getArray(): IArray;
    getReference(): IRef;
    getBuffer(): Buffer;
    clear(): void;
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
export declare type IDictionaryKeyType = 'boolean' | 'long' | 'name' | 'real';
export interface IDictionary {
    dirty: boolean;
    immutable: boolean;
    tryGet(doc: Document, candidate: IObj): IDictionary | null;
    getKey(k: string): IObj;
    addKey(prop: string, value: boolean | number | string | IObj): void;
    getKeys(): string[];
    hasKey(k: string): boolean;
    removeKey(k: string): void;
    getKeyAs(k: string, t: IDictionaryKeyType): string | number;
    clear(): void;
    write(destination: string, cb: (e: Error, i: string) => void): void;
    writeSync(destination: string): void;
}
export declare const resolveDictionary: (doc: Document, candidate: IObj) => IDictionary | null;
