export class PublicationByVenue {
    private _venue: string;
    private _publicationCount: number;

    public get venue(): string {
        return this._venue;
    }

    public set venue(_venue: string) {
        this._venue = _venue;
    }

    public get publicationCount(): number {
        return this._publicationCount;
    }
    
    public set publicationCount(_publicationCount: number) {
        this._publicationCount = _publicationCount;
    }
}