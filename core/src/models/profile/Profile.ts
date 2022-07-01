import { Article, Author, ReferenceOrCitation } from '../articles';

export abstract class Profile {}
export class BasicProfile implements Profile {
    private _id: string;
    private _name: string;
    private _affiliation: string[];
    private _totalCitations: number;

    constructor(_id: string, _name?: string, _affiliation?: string[], _totalCitations?: number) {
        this._id = _id;
        this._name = _name;
        this._affiliation = _affiliation;
        this._totalCitations = _totalCitations;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get affiliation(): string[] {
        return this._affiliation;
    }

    public set affiliation(affiliation: string[]) {
        this._affiliation = affiliation;
    }

    public get totalCitations(): number {
        return this._totalCitations;
    }

    public set totalCitations(totalCitations: number) {
        this._totalCitations = totalCitations;
    }
}
export class FullProfile {
    private _basicProfile: BasicProfile;
    private _hIndex: HIndex;
    private _i10Index: I10Index;
    private _articles: Article[];
    private _website: string;
    private _selfCitationCount: number;
    private _indirectSelfCitationCount: number;

    constructor(basicProfile: BasicProfile, hIndex: HIndex, i10Index: I10Index, articles: Article[], website: string) {
        this._basicProfile = basicProfile;
        this._hIndex = hIndex;
        this._i10Index = i10Index;
        this._articles = articles;
        this._website = website;
    }

    public get basicProfile(): BasicProfile {
        return this._basicProfile;
    }

    public get hIndex(): HIndex {
        return this._hIndex;
    }

    public get i10Index(): I10Index {
        return this._i10Index;
    }
    public get articles(): Article[] {
        return this._articles;
    }
    public get website(): string {
        return this._website;
    }
    public getSelfCitations(): number {
        if (this._selfCitationCount) {
            return this._selfCitationCount;
        }
        let selfCitationCount: number = 0;
        this.articles.forEach((article: Article) => {
            selfCitationCount += article.getSelfCitations(this._basicProfile.id);
        });
        this._selfCitationCount = selfCitationCount;
        return this._selfCitationCount;
    }
    public getIndirectSelfCitations(): number {
        console.log('begin indirect self citations');
        if (this._indirectSelfCitationCount) {
            return this._indirectSelfCitationCount;
        }
        let indirectSelfCitationCount: number = 0;
        for (const article of this._articles) {
            for (const citation of article.citations) {
                if (citation.isOwn(this._basicProfile.id)) continue;
                for (const author of citation.authors) {
                    if (article.authors.find((e: Author) => e.id === author.id)) {
                        ++indirectSelfCitationCount;
                        break;
                    }
                }
            }
        }

        this._indirectSelfCitationCount = indirectSelfCitationCount;
        return this._indirectSelfCitationCount;
    }
}
export class HIndex {
    private _hIndex: number;
    private _hIndexWithoutSelfCitations: number;

    constructor(hIndex?: number, hIndexWithoutSelfCitations?: number) {
        this._hIndex = hIndex;
        this._hIndexWithoutSelfCitations = hIndexWithoutSelfCitations;
    }
    public get hIndex(): number {
        return this._hIndex;
    }

    public set hIndex(value: number) {
        this._hIndex = value;
    }

    public get hIndexWithoutSelfCitations(): number {
        return this._hIndexWithoutSelfCitations;
    }
    public set hIndexWithoutSelfCitations(value: number) {
        this._hIndexWithoutSelfCitations = value;
    }
}
export class I10Index {
    private _i10Index: number;
    private _i10IndexWithoutSelfCitations: number;

    constructor(i10Index: number, i10IndexWithoutSelfCitations: number) {
        this._i10Index = i10Index;
        this._i10IndexWithoutSelfCitations = i10IndexWithoutSelfCitations;
    }

    public get i10Index(): number {
        return this._i10Index;
    }

    public get i10IndexWithoutSelfCitations(): number {
        return this._i10IndexWithoutSelfCitations;
    }
}
export class CitationByYear {
    private _year: number;
    private _count: number;
    private _selfCitations: number;
    constructor(_year: number, _count: number, _selfCitations: number) {
        this._year = _year;
        this._count = _count;
        this._selfCitations = _selfCitations;
    }

    public get year(): number {
        return this._year;
    }
    public get count(): number {
        return this._count;
    }
    public get selfCitations(): number {
        return this._selfCitations;
    }
}
