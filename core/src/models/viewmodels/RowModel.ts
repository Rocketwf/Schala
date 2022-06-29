import { SimpleCardModel } from '../simplecardmodel';

export class RowModel {
    private _id: string = '_' + Math.random().toString(36);
    private _width: number;
    private _simpleCardModels: Array<SimpleCardModel>;

    constructor(_width: number) {
        this._width = _width;
        this._simpleCardModels = new Array<SimpleCardModel>();
    }
    public get id(): string {
        return this._id;
    }
    public get width(): number {
        return this._width;
    }
    public get simpleCardModels(): Array<SimpleCardModel> {
        return this._simpleCardModels;
    }
}
