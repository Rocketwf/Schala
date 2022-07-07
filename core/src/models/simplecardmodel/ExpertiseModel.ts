import { SimpleCardModel, ViewName } from '../simplecardmodel';

export class ExpertiseModel implements SimpleCardModel {
    private _id: string = 'a' + Math.random().toString(31);
    private _expertise: Array<string>;
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;

    constructor(_expertise: Array<string>, _title: string, _sub: string, _viewName: ViewName, _colWidth: number) {
        this._expertise = _expertise;
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
    }

    public get expertise(): Array<string> {
        return this._expertise;
    }

    public get colWidth(): number {
        return this._colWidth;
    }
    public get title(): string {
        return this._title;
    }
    public get id(): string {
        return this._id;
    }
    public get sub(): string {
        return this._sub;
    }
    public get viewName(): ViewName {
        return this._viewName;
    }
}
