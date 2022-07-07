import { Article } from './Article';
import { Author } from './Author';
import { BasicProfile } from './BasicProfile';
import { CitationsByYear } from './CitationsByYear';
import { CitedScholar } from './CitedScholar';
import { Profile } from './Profile';
import { PublicationByVenue } from './PublicationByVenue';
import { PublicationByYear } from './PublicationByYear';

export class FullProfile extends Profile {
    private _expertise: string[];
    private _hIndex: number;
    private _hIndexWithoutSelfCitations: number;
    private _i10Index: number;
    private _i10IndexWithoutSelfCitations: number;
    private _selfCitationsCount: number;
    private _indirectSelfCitationsCount: number;
    private _totalCitationsCount: number;

    private _basicProfile: BasicProfile;
    private _publicationsByYear: PublicationByYear[];
    private _publicationsByVenue: PublicationByVenue[];
    private _citationsByYear: CitationsByYear[];
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
        _basicProfile: BasicProfile,
        _publicationsByYear: PublicationByYear[],
        _publicationsByVenue: PublicationByVenue[],
        _citationsByYear: CitationsByYear[],
        _citedScholars: CitedScholar[],
        _authors: Author[],
        _articles: Article[],
    ) {
        super();
        this._expertise = _expertise;
        this._hIndex = _hIndex;
        this._hIndexWithoutSelfCitations = _hIndexWithoutSelfCitations;
        this._i10Index = _i10Index;
        this._i10IndexWithoutSelfCitations = _i10IndexWithoutSelfCitations;
        this._selfCitationsCount = _selfCitationsCount;
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
        this._totalCitationsCount = _totalCitationsCount;
        this._basicProfile = _basicProfile;
        this._publicationsByYear = _publicationsByYear;
        this._publicationsByVenue = _publicationsByVenue;
        this._citationsByYear = _citationsByYear;
        this._citedScholars = _citedScholars;
        this._authors = _authors;
        this._articles = _articles;
    }
    public get expertise(): string[] {
        return this._expertise;
    }

    public set expertises(_expertise: string[]) {
        this._expertise = _expertise;
    }

    public get hIndex(): number {
        return this._hIndex;
    }

    public set hIndex(_hIndex: number) {
        this._hIndex = _hIndex;
    }

    public get hIndexWithoutSelfCitations(): number {
        return this._hIndexWithoutSelfCitations;
    }

    public set hIndexWithoutSelfCitations(_hIndexWithoutSelfCitations: number) {
        this._hIndexWithoutSelfCitations = _hIndexWithoutSelfCitations;
    }

    public get i10Index(): number {
        return this._i10Index;
    }

    public set i10Index(_i10Index: number) {
        this._i10Index = _i10Index;
    }

    public get i10IndexWithoutSelfCitations(): number {
        return this._i10IndexWithoutSelfCitations;
    }

    public set i10IndexWithoutSelfCitations(_i10IndexWithoutSelfCitations: number) {
        this._i10IndexWithoutSelfCitations = _i10IndexWithoutSelfCitations;
    }

    public get selfCitationsCount(): number {
        return this._selfCitationsCount;
    }

    public set selfCitationsCount(_selfCitationsCount: number) {
        this._selfCitationsCount = _selfCitationsCount;
    }

    public get indirectSelfCitationsCount(): number {
        return this._indirectSelfCitationsCount;
    }

    public set indirectSelfCitationsCount(_indirectSelfCitationsCount: number) {
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
    }

    public get totalCitationsCount(): number {
        return this._totalCitationsCount;
    }

    public set totalCitationsCount(_totalCitationsCount: number) {
        this._totalCitationsCount = _totalCitationsCount;
    }

    public get basicProfile(): BasicProfile {
        return this._basicProfile;
    }

    public set basicProfile(_basicProfile: BasicProfile) {
        this._basicProfile = _basicProfile;
    }

    public get publicationsByYear(): PublicationByYear[] {
        return this._publicationsByYear;
    }

    public set publicationsByYear(_publicationsByYear: PublicationByYear[]) {
        this._publicationsByYear = _publicationsByYear;
    }

    public get publicationsByVenue(): PublicationByVenue[] {
        return this._publicationsByVenue;
    }

    public set publicationsByVenue(_publicationsByVenue: PublicationByVenue[]) {
        this._publicationsByVenue = _publicationsByVenue;
    }

    public get citationsByYear(): CitationsByYear[] {
        return this._citationsByYear;
    }

    public set citationsByYear(_citationsByYear: CitationsByYear[]) {
        this._citationsByYear = _citationsByYear;
    }

    public get citedScholars(): CitedScholar[] {
        return this._citedScholars;
    }

    public set citedScholars(_citedScholar: CitedScholar[]) {
        this._citedScholars = _citedScholar;
    }

    public get authors(): Author[] {
        return this._authors;
    }

    public set authors(_authors: Author[]) {
        this._authors = _authors;
    }

    public get articles(): Article[] {
        return this._articles;
    }

    public set articles(_articles: Article[]) {
        this._articles = _articles;
    }
}
