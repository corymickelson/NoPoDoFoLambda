import { NPDFInternal } from "./object";
export declare class Data {
    private _instance;
    readonly value: string;
    constructor(value: string | NPDFInternal);
    write(output: string): void;
}
