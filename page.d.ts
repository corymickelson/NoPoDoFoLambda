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
import { IFieldInfo, Field } from './field';
import { Rect } from './rect';
import { Obj } from './object';
import { Annotation, NPDFAnnotation } from './annotation';
export interface IPage {
    rotation: number;
    trimBox: Rect;
    number: number;
    width: number;
    height: number;
    getNumFields(): number;
    getFieldsInfo(): Array<IFieldInfo>;
    getField(index: number): Field;
    getFields(): Array<Field>;
    getFieldIndex(fieldName: string): number;
    getContents(append: boolean): Obj;
    getResources(): Obj;
    getMediaBox(): Rect;
    getBleedBox(): Rect;
    getArtBox(): Rect;
    getNumAnnots(): number;
    createAnnotation(type: NPDFAnnotation, rect: Rect): Annotation;
    getAnnotation(index: number): Annotation;
    getAnnotations(): Array<Annotation>;
    deleteAnnotation(index: number): void;
}
export declare class Page implements IPage {
    private _instance;
    trimBox: Rect;
    number: number;
    width: number;
    height: number;
    rotation: number;
    constructor(_instance: any);
    getContents(append: boolean): Obj;
    getResources(): Obj;
    getMediaBox(): Rect;
    getBleedBox(): Rect;
    getArtBox(): Rect;
    getNumFields(): number;
    getFieldsInfo(): IFieldInfo[];
    getFieldIndex(fieldName: string): number;
    getField(index: number): Field;
    getFields(): Array<Field>;
    createAnnotation(type: NPDFAnnotation, rect: Rect): Annotation;
    getAnnotation(index: number): Annotation;
    getNumAnnots(): number;
    getAnnotations(): Array<Annotation>;
    deleteAnnotation(index: number): void;
    private static assertRect(rect);
}
