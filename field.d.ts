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
import { Document } from './document';
import { NPDFInternal, IObj } from "./object";
import { Annotation } from "./annotation";
export interface IFieldInfo {
    name: string;
    alternateName: string;
    mappingName: string;
    required: boolean;
    readOnly: boolean;
    value: string | number;
    maxLen?: number;
    multiLine?: boolean;
    caption?: string;
    type: string;
    selected?: string;
}
export declare type FieldType = 'TextField' | 'CheckBox' | 'RadioButton' | 'PushButton' | 'Signature' | 'ListField' | 'ComboBox' | 'ListBox';
export declare class Field {
    private _instance;
    readOnly: boolean;
    fieldName: string;
    readonly type: FieldType;
    constructor(_instance: NPDFInternal);
    getAlternateName(): string;
    getMappingName(): string;
    isRequired(): boolean;
    setRequired(required: boolean): void;
    setAlternateName(name: string): void;
    setMappingName(name: string): void;
}
export declare class TextField extends Field {
    private _textFieldInstance;
    constructor(field: Field);
    text: string;
}
export declare class CheckBox extends Field {
    private _checkboxInstance;
    checked: boolean;
    constructor(field: Field);
}
export declare type IListItem = {
    value: string;
    display: string;
};
export declare class EnumerableField extends Field {
    private _enumerableFieldInstance;
    selected: number;
    readonly length: any;
    constructor(field: Field);
    getItem(index: number): IListItem;
    setItem(item: IListItem): void;
    removeItem(index: number): void;
}
export declare class ListBox extends EnumerableField {
    private _listBoxInstance;
    constructor(field: Field);
}
export declare class ComboBox extends EnumerableField {
    private _comboBoxInstance;
    constructor(field: Field);
}
export declare class SignatureField {
    private _instance;
    constructor(annot: Annotation | any, doc?: Document);
    setReason(reason: string): void;
    setLocation(local: string): void;
    setCreator(creator: string): void;
    setDate(): void;
    setFieldName(n: string): void;
    getObject(): IObj;
}
