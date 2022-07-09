import { Profile } from './Profile';

export class BasicProfile extends Profile {
    private _id: string;
    private _name: string;
    private _affiliations: string[];
    private _totalCitations: number;
    private _pictureUrl: string;
    private _paperCount: number;

    constructor(
        _id: string,
        _name?: string,
        _affiliations?: string[],
        _totalCitations?: number,
        _paperCount?: number,
        _pictureUrl?: string,
    ) {
        super();
        this._id = _id;
        this._name = _name;
        this._affiliations = _affiliations;
        this._totalCitations = _totalCitations;
        this._paperCount = _paperCount;
        this._pictureUrl = _pictureUrl;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get totalCitations(): number {
        return this._totalCitations;
    }

    public set totalCitations(totalCitations: number) {
        this._totalCitations = totalCitations;
    }

    public get paperCount(): number {
        return this._paperCount;
    }

    public set paperCount(paperCount: number) {
        this._paperCount = paperCount;
    }

    public get pictureUrl(): string {
        return this._pictureUrl;
    }
    public set pictureUrl(url: string) {
        this._pictureUrl = url;
    }
    public get affiliations(): string[] {
        return this._affiliations;
    }
    public set affiliations(affiliations: string[]) {
        this._affiliations = affiliations;
    }
}
