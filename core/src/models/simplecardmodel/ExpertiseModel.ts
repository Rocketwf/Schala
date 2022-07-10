import { SimpleCardModel, ViewName } from '../simplecardmodel';

export class ExpertiseModel implements SimpleCardModel {
    private _id: string = 'a' + Math.random().toString(31);
    private _expertise: Expertise[];
    private _colWidth: number;
    private _title: string;
    private _sub: string;
    private _viewName: ViewName;

    constructor(_expertise: Array<Expertise>, _title: string, _sub: string, _viewName: ViewName, _colWidth: number) {
        this._expertise = _expertise;
        this._title = _title;
        this._sub = _sub;
        this._viewName = _viewName;
        this._colWidth = _colWidth;
    }

    public get expertise(): Array<Expertise> {
        return this._expertise;
    }

    public set expertise(v: Array<Expertise>) {
        this._expertise = v;
    }

    public get colWidth(): number {
        return this._colWidth;
    }

    public set colWidth(v: number) {
        this._colWidth = v;
    }

    public get title(): string {
        return this._title;
    }

    public set title(v: string) {
        this._title = v;
    }

    public get id(): string {
        return this._id;
    }

    public set id(v: string) {
        this._id = v;
    }

    public get sub(): string {
        return this._sub;
    }

    public set sub(v: string) {
        this._sub = v;
    }

    public get viewName(): ViewName {
        return this._viewName;
    }

    public set viewName(v: ViewName) {
        this._viewName = v;
    }

    public get entries(): number {
        return this._expertise.length;
    }
}

export class Expertise {
    private _id: string = '@' + Math.random().toString(31);
    private _name: string;
    private _expertise: string[];

    constructor(_name: string, _expertise: string[]) {
        this._name = _name;
        this._expertise = _expertise;
    }
    public get name(): string {
        return this._name;
    }

    public set name(v: string) {
        this._name = v;
    }

    public get expertise(): string[] {
        return this._expertise;
    }
    public set expertise(v: string[]) {
        this._expertise = v;
    }
    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }
}
