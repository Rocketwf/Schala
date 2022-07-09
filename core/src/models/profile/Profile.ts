import { Article } from '../articles';

export abstract class Profile {}
export class BasicProfile {
    private _id: string;
    private _name: string;
    private _affiliation: string[];
    private _totalCitations: number;
    private _paperCount: number;
    private _pictureURL: string;

    constructor(
        _id: string,
        _name?: string,
        _affiliation?: string[],
        _totalCitations?: number,
        _paperCount?: number,
        _pictureURL?: string,
    ) {
        this._id = _id;
        this._name = _name;
        this._affiliation = _affiliation;
        this._totalCitations = _totalCitations;
        this._paperCount = _paperCount;
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

    public get paperCount(): number {
        return this._paperCount;
    }
}

export class FullProfile {
    private _expertise: string[];
    private _hIndex: number;
    private _hIndexWithoutSelfCitations: number;
    private _i10Index: number;
    private _i10IndexWithoutSelfCitations: number;
    private _selfCitationsCount: number;
    private _indirectSelfCitationsCount: number;
    private _url: string;
    private _basicProfile: BasicProfile;
    private _publicationsByYear: PublicationByYear[];
    private _publicationsByVenue: PublicationByVenue[];
    private _citationsByYear: CitationByYear[];
    private _citedScholars: CitedScholar[];
    private _authors: Author[];
    private _articles: Article[];

    constructor(
        _expertise: string[],
        _hIndex: number,
        _hIndexWithoutSelfCitations: number,
        _i10Index: number,
        _i10IndexWithoutSelfCitations: number,
        _selfCitationsCount: number,
        _indirectSelfCitationsCount: number,
        _totalCitationsCount: number,
        _url: string,
        _basicProfile: BasicProfile,
        _publicationsByYear: PublicationByYear[],
        _publicationsByVenue: PublicationByVenue[],
        _citationsByYear: CitationByYear[],
        _citedScholars: CitedScholar[],
        _authors: Author[],
        _articles: Article[],
    ) {
        this._expertise = _expertise;
        this._hIndex = _hIndex;
        this._hIndexWithoutSelfCitations = _hIndexWithoutSelfCitations;
        this._i10Index = _i10Index;
        this._i10IndexWithoutSelfCitations = _i10IndexWithoutSelfCitations;
        this._selfCitationsCount = _selfCitationsCount;
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
        this._url = _url;
        this._basicProfile = _basicProfile;
        this._publicationsByYear = _publicationsByYear;
        this._publicationsByVenue = _publicationsByVenue;
        this._citationsByYear = _citationsByYear;
        this._citedScholars = _citedScholars;
        this._authors = _authors;
        this._articles = _articles;
    }

    public get publicationsByYear(): PublicationByYear[] {
        return this._publicationsByYear;
    }
    public set publicationsByYear(newPublicationsByYear: PublicationByYear[]) {
        this._publicationsByYear = newPublicationsByYear;
    }
    public get publicationsByVenue(): PublicationByVenue[] {
        return this._publicationsByVenue;
    }
    public set publicationsByVenue(newPublicationsByVenue: PublicationByVenue[]) {
        this._publicationsByVenue = newPublicationsByVenue;
    }
    public get citationsByYear(): CitationByYear[] {
        return this._citationsByYear;
    }

    public get citedScholars(): CitedScholar[] {
        return this._citedScholars;
    }
    public set citedScholars(newCitedScholars: CitedScholar[]) {
        this._citedScholars = newCitedScholars;
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

    public get selfCitationsCount(): number {
        return this._selfCitationsCount;
    }

    public set selfCitationsCount(selfCitationsCount: number) {
        this._selfCitationsCount = selfCitationsCount;
    }

    public get indirectSelfCitationsCount(): number {
        return this._indirectSelfCitationsCount;
    }

    public set indirectSelfCitationsCount(indirectSelfCitationsCount: number) {
        this._indirectSelfCitationsCount = indirectSelfCitationsCount;
    }

    public get publicationsCount(): number {
        return this._articles.length;
    }

    public get authors(): Author[] {
        return this._authors;
    }
    public set authors(authors: Author[]) {
        this._authors = authors;
    }

    public get url(): string {
        return this._url;
    }
    public set url(url: string) {
        this._url = url;
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

export class PublicationByYear {
    private _year: number;
    private _publicationsCount: number;
    constructor(_year: number, _publicationCount: number) {
        this._year = _year;
        this._publicationsCount = _publicationCount;
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
        this._publicationsCount = publicationsCount;
    }
}

export class PublicationByVenue {
    private _venue: string;
    private _publicationCount: number;
    constructor(_venue: string, _publicationCount: number) {
        this._venue = _venue;
        this._publicationCount = _publicationCount;
    }

    public get venue(): string {
        return this._venue;
    }
    public set venue(newYear: string) {
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
    public get citationsCount(): number {
        return this._citationCount;
    }
    public set citationsCount(newCount: number) {
        this._citationCount = newCount;
    }
}
export class Author {
    private _name: string;
    private _jointPublicationCount: number;
    private _hIndex: number;
    constructor(_name: string, _jointPublicationCount: number, _hIndex: number) {
        this._hIndex = _hIndex;
        this._jointPublicationCount = _jointPublicationCount;
        this._name = _name;
    }

    public get hIndex(): number {
        return this._hIndex;
    }
    public get name(): string {
        return this._name;
    }
    public get jointPublicationCount(): number {
        return this._jointPublicationCount;
    }
}
