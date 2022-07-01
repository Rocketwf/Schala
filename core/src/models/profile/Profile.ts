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
    private _selfCitationCountByYear: Map<number, number>;
    private _indirectSelfCitationByYear: Map<number, number>;
    private _totalCitationsByYear: Map<number, number>;

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
    public getSelfCitationsByYear(): Map<number, number> {
        if (this._selfCitationCountByYear) {
            return this._selfCitationCountByYear;
        }
        const selfCitationCountByYear: Map<number, number> = new Map<number, number>();
        this.articles.forEach((article: Article) => {
            if (!selfCitationCountByYear.has(article.year)) selfCitationCountByYear.set(article.year, 0);
            selfCitationCountByYear.set(
                article.year,
                selfCitationCountByYear.get(article.year) + article.getSelfCitations(this._basicProfile.id),
            );
        });
        this._selfCitationCountByYear = selfCitationCountByYear;
        return this._selfCitationCountByYear;
    }
    public getSelfCitationsCount(): number {
        const selfCitationsByYear: number = Array.from(this.getSelfCitationsByYear().values()).reduce(
            (acc: number, value: number) => acc + value,
        );
        return selfCitationsByYear;
    }
    public getIndirectSelfCitationsByYear(): Map<number, number> {
        if (this._indirectSelfCitationByYear) {
            return this._indirectSelfCitationByYear;
        }
        const indirectSelfCitationCountByYear: Map<number, number> = new Map<number, number>();
        for (const article of this._articles) {
            for (const citation of article.citations) {
                if (citation.isOwn(this._basicProfile.id)) continue;
                for (const author of citation.authors) {
                    if (article.authors.find((e: Author) => e.id === author.id)) {
                        if (!indirectSelfCitationCountByYear.has(citation.year))
                            indirectSelfCitationCountByYear.set(citation.year, 0);
                        indirectSelfCitationCountByYear.set(
                            citation.year,
                            indirectSelfCitationCountByYear.get(citation.year) + 1,
                        );
                        break;
                    }
                }
            }
        }

        this._indirectSelfCitationByYear = indirectSelfCitationCountByYear;
        return this._indirectSelfCitationByYear;
    }
    public getIndirectSelfCitationsCount(): number {
        const indirectSelfCitationsByYear: number = Array.from(this.getIndirectSelfCitationsByYear().values()).reduce(
            (acc: number, value: number) => acc + value,
        );
        return indirectSelfCitationsByYear;
    }
    public getTotalCitationsByYear(): Map<number, number> {
        if (this._totalCitationsByYear) {
            return this._totalCitationsByYear;
        }
        const totalCitationsCountByYear: Map<number, number> = new Map<number, number>();
        for (const article of this._articles) {
            for (const citation of article.citations) {
                if (!totalCitationsCountByYear.has(citation.year)) totalCitationsCountByYear.set(citation.year, 0);
                totalCitationsCountByYear.set(citation.year, totalCitationsCountByYear.get(citation.year) + 1);
            }
        }

        this._totalCitationsByYear = totalCitationsCountByYear;
        return this._totalCitationsByYear;
    }
    public getTotalCitationsCount(): number {
        const totalCitationsCountByYear: number = Array.from(this.getTotalCitationsByYear().values()).reduce(
            (acc: number, value: number) => acc + value,
        );
        return totalCitationsCountByYear;
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
