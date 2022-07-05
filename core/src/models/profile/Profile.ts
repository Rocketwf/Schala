import {
    APIBasicProfile,
    APICitationByYear,
    APICitedScholar,
    APIFullProfile,
    APIPublicationByVenue,
    APIPublicationByYear,
} from '../api/API';
import { Article, Author } from '../articles';

export abstract class Profile {}
export class BasicProfile implements APIBasicProfile {
    private _id: string;
    private _name: string;
    private _affiliation: string[];
    private _totalCitations: number;
    private _pictureURL: string;

    constructor(_id: string, _name?: string, _affiliation?: string[], _totalCitations?: number, _pictureURL?: string) {
        this._id = _id;
        this._name = _name;
        this._affiliation = _affiliation;
        this._totalCitations = _totalCitations;
        this._pictureURL = _pictureURL;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get affiliation(): string[] {
        return this._affiliation;
    }

    public get pictureURL(): string {
        return this._pictureURL;
    }

    public get totalCitations(): number {
        return this._totalCitations;
    }
}

export class FullProfile implements APIFullProfile {
    private _basicProfile: BasicProfile;
    private _expertise: string[];
    private _hIndex: number;
    private _hIndexWithoutSelfCitations: number;
    private _i10Index: number;
    private _i10IndexWithoutSelfCitations: number;
    private _articles: Article[];
    private _citedScholar: APICitedScholar;
    private _citationByYear: APICitationByYear;
    private _publicationByVenue: APIPublicationByVenue;
    private _publicationByYear: APIPublicationByYear;

    constructor(
        _basicProfile: BasicProfile,
        _expertise: string[],
        _hIndex: number,
        _i10Index: number,
        _articles: Article[],
        _publicationsByYear: APIPublicationByYear,
        _publicationsByVenue: APIPublicationByVenue,
        _citationsByYear: APICitationByYear,
        _citedScholar: APICitedScholar,
    ) {
        this._basicProfile = _basicProfile;
        this._expertise = _expertise;
        this._hIndex = _hIndex;
        this._i10Index = _i10Index;
        this._articles = _articles;
        this._publicationByYear = _publicationsByYear;
        this._publicationByVenue = _publicationsByVenue;
        this._citationByYear = _citationsByYear;
        this._citedScholar = _citedScholar;
    }

    public get publicationByYear(): APIPublicationByYear {
        return this._publicationByYear;
    }
    public set publicationsByYear(newPublicationsByYear: APIPublicationByYear) {
        this._publicationByYear = newPublicationsByYear;
    }
    public get publicationByVenue(): APIPublicationByVenue {
        return this._publicationByVenue;
    }
    public set publicationByVenue(newPublicationsByVenue: APIPublicationByVenue) {
        this._publicationByVenue = newPublicationsByVenue;
    }
    public get citationByYear(): APICitationByYear {
        return this._citationByYear;
    }

    public get citedScholar(): APICitedScholar {
        return this._citedScholar;
    }
    public set citedScholar(newCitedScholar: APICitedScholar) {
        this._citedScholar = newCitedScholar;
    }

    public get articles(): Article[] {
        return this._articles;
    }
    public set articles(articles: Article[]) {
        this._articles = articles;
    }
    public get i10IndexWithoutSelfCitations(): number {
        return this._i10IndexWithoutSelfCitations;
    }
    public set i10IndexWithoutSelfCitations(i10IndexWithoutSelfCitations: number) {
        this._i10IndexWithoutSelfCitations = i10IndexWithoutSelfCitations;
    }
    public get i10Index(): number {
        return this._i10Index;
    }
    public set i10Index(i10Index: number) {
        this.i10Index = i10Index;
    }
    public get expertise(): string[] {
        return this._expertise;
    }
    public set expertise(expertise: string[]) {
        this._expertise = expertise;
    }
    public get hIndex(): number {
        return this._hIndex;
    }
    public set hIndex(hIndex: number) {
        this.hIndex = hIndex;
    }
    public get hIndexWithoutSelfCitations(): number {
        return this._hIndexWithoutSelfCitations;
    }
    public set hIndexWithoutSelfCitations(hIndexWithoutSelfCitations: number) {
        this._hIndexWithoutSelfCitations = hIndexWithoutSelfCitations;
    }
    public get basicProfile(): BasicProfile {
        return this._basicProfile;
    }
    public set basicProfile(basicProfile: BasicProfile) {
        this.basicProfile = basicProfile;
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

export class CitationByYear {
    private _year: number;
    private _selfCitationsCount: number;
    private _indirectSelfCitationsCount: number;
    private _totalCitationsCount: number;
    constructor(
        _year: number,
        _selfCitationsCount: number,
        _indirectSelfCitationsCount: number,
        _totalCitationsCount: number,
    ) {
        this._year = _year;
        this._selfCitationsCount = _selfCitationsCount;
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
        this._totalCitationsCount = _totalCitationsCount;
    }

    public get year(): number {
        return this._year;
    }
    public set year(newYear: number) {
        this._year = newYear;
    }
    public get selfCitationCount(): number {
        return this._selfCitationsCount;
    }
    public set selfCitationCount(newSelfCitationCount: number) {
        this._selfCitationsCount = newSelfCitationCount;
    }
    public get indirectSelfCitationsCount(): number {
        return this._indirectSelfCitationsCount;
    }
    public set indirectSelfCitationsCount(newIndirectSelfCitationsCount: number) {
        this._indirectSelfCitationsCount = newIndirectSelfCitationsCount;
    }
    public get totalCitationsCount(): number {
        return this._totalCitationsCount;
    }
    public set totalCitationsCount(newTotalCitationsCount: number) {
        this._totalCitationsCount = newTotalCitationsCount;
    }
}

export class PublicationByYear implements APIPublicationByYear {
    private _year: number;
    private _publicationsCount: number;
    constructor(_year: number, _publicationCount: number) {
        this._year = _year;
        this.publicationsCount = _publicationCount;
    }

    public get year(): number {
        return this._year;
    }
    public set year(newYear: number) {
        this._year = newYear;
    }
    public get publicationsCount(): number {
        return this._publicationsCount;
    }
    public set publicationsCount(publicationsCount: number) {
        this.publicationsCount = publicationsCount;
    }
}

export class PublicationByVenue {
    private _venue: string;
    private _publicationCount: number;
    constructor(_venue: string, _publicationCount: number) {
        this._venue = _venue;
        this._publicationCount = _publicationCount;
    }

    public get year(): string {
        return this._venue;
    }
    public set year(newYear: string) {
        this._venue = newYear;
    }
    public get publicationCount(): number {
        return this._publicationCount;
    }
    public set publicationCount(newCount: number) {
        this._publicationCount = newCount;
    }
}

export class CitedScholar {
    private _name: string;
    private _citationCount: number;
    constructor(_name: string, _citationCount: number) {
        this._name = _name;
        this._citationCount = _citationCount;
    }

    public get name(): string {
        return this._name;
    }
    public set name(newName: string) {
        this._name = newName;
    }
    public get publicationCount(): number {
        return this._citationCount;
    }
    public set publicationCount(newCount: number) {
        this._citationCount = newCount;
    }
}
