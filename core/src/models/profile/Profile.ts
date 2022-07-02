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
    private _fasterCitations: Map<number, Citations>;

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
    public get citations(): Map<number, Citations> {
        if (this._fasterCitations) {
            return this._fasterCitations;
        }
        const fasterCitations: Map<number, Citations> = new Map<number, Citations>();
        for (const article of this._articles) {
            let citations: Citations = fasterCitations.get(article.year);

            if (!citations) {
                citations = new Citations(+article.year, 0, 0, 0);
                fasterCitations.set(article.year, citations);
            }

            for (const citation of article.citations) {
                let totalCite: Citations = fasterCitations.get(citation.year);
                if (!totalCite) {
                    totalCite = new Citations(+citation.year, 0, 0, 0);
                    fasterCitations.set(citation.year, totalCite);
                }
                totalCite.totalCitationsCount++;
                if (citation.isOwn(this._basicProfile.id)) continue;
                for (const author of citation.authors) {
                    if (article.authors.find((e: Author) => e.id === author.id)) {
                        let indSelfCite: Citations = fasterCitations.get(citation.year);
                        if (!indSelfCite) {
                            indSelfCite = new Citations(+article.year, 0, 0, 0);
                            fasterCitations.set(citation.year, indSelfCite);
                        }
                        indSelfCite.indirectSelfCitationsCount++;
                        break;
                    }
                }
            }

            citations.selfCitationsCount += article.getSelfCitations(this._basicProfile.id);
        }
        this._fasterCitations = fasterCitations;
        return this._fasterCitations;
    }
    public getSelfCitationsCount(): number {
        if (!this._fasterCitations) this._fasterCitations = this.citations;
        return Array.from(this.citations.values())
            .map((e: Citations) => e.selfCitationsCount)
            .reduce((acc: number, curr: number) => acc + curr);
    }
    public getIndirectSelfCitationsCount(): number {
        if (!this._fasterCitations) this._fasterCitations = this.citations;
        return Array.from(this.citations.values())
            .map((e: Citations) => e.indirectSelfCitationsCount)
            .reduce((acc: number, curr: number) => acc + curr);
    }
    public getTotalCitationsCount(): number {
        if (!this._fasterCitations) this._fasterCitations = this.citations;
        return Array.from(this.citations.values())
            .map((e: Citations) => e.totalCitationsCount)
            .reduce((acc: number, curr: number) => acc + curr);
    }
}
export class Citations {
    private _year: number;
    private _selfCitationsCount: number;
    private _indirectSelfCitationCount: number;
    private _totalCitationsCount: number;
    constructor(
        _year: number,
        _selfCitationsCount: number,
        _indirectSelfCitationCount: number,
        _totalCitationsCount: number,
    ) {
        this._year = _year;
        this._selfCitationsCount = _selfCitationsCount;
        this._indirectSelfCitationCount = _indirectSelfCitationCount;
        this._totalCitationsCount = _totalCitationsCount;
    }

    public set year(_year: number) {
        this._year = _year;
    }
    public get year(): number {
        return this._year;
    }
    public set indirectSelfCitationsCount(_indirectSelfCitationCount: number) {
        this._indirectSelfCitationCount = _indirectSelfCitationCount;
    }
    public get indirectSelfCitationsCount(): number {
        return this._indirectSelfCitationCount;
    }
    public set selfCitationsCount(_selfCitationsCount: number) {
        this._selfCitationsCount = _selfCitationsCount;
    }
    public get selfCitationsCount(): number {
        return this._selfCitationsCount;
    }
    public set totalCitationsCount(_totalCitationsCount: number) {
        this._totalCitationsCount = _totalCitationsCount;
    }
    public get totalCitationsCount(): number {
        return this._totalCitationsCount;
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
