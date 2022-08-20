import { Article } from './Article';
import { Author } from './Author';
import { BasicProfile } from './BasicProfile';
import { CitationsByYear } from './CitationsByYear';
import { CitedScholar } from './CitedScholar';
import { Profile } from './Profile';
import { PublicationByVenue } from './PublicationByVenue';
import { PublicationByYear } from './PublicationByYear';

/**
 * This class represents a complete profile of a scholar containing
 * every relevant information
 */
export class FullProfile extends Profile 
{
    /**
     * The h-index of the scholar
     */
    private _hIndex: number;
    /**
     * The h-index without self citations of the scholar
     */
    private _hIndexWithoutSelfCitations: number;
    /**
     * The i10-index of the scholar
     */
    private _i10Index: number;
    /**
     * The i10-index with self citations of the scholar
     */
    private _i10IndexWithoutSelfCitations: number;
    /**
     * The self citations of the scholar
     */
    private _selfCitationsCount: number;
    /**
     * The indirect self citations of the scholar
     */
    private _indirectSelfCitationsCount: number;
    /**
     * The total citations of the scholar
     */
    private _totalCitationsCount: number;
    /**
     * The URL of the homepage of the scholar
     */
    private _url: string;

    /**
     * The basic profile of the scholar
     */
    private _basicProfile: BasicProfile;
    /**
     * The publications by year data of the scholar
     */
    private _publicationsByYear: PublicationByYear[];
    /**
     * The publications by venue data of the scholar
     */
    private _publicationsByVenue: PublicationByVenue[];
    /**
     * The citations by year data of the scholar
     */
    private _citationsByYear: CitationsByYear[];
    /**
     * The cited scholars data of the scholar
     */
    private _citedScholars: CitedScholar[];
    /**
     * The authors data of the scholar
     */
    private _authors: Author[];
    /**
     * The articles of the scholar
     */
    private _articles: Article[];

    /**
     * Creates an instance of full profile.
     * @param _expertise - The expertises of the scholar
     * @param _hIndex - The h-index of the scholar
     * @param _hIndexWithoutSelfCitations - The h-index without self citations of the scholar
     * @param _i10Index - The i10-index of the scholar
     * @param _i10IndexWithoutSelfCitations - The i10-index without self citations of the scholar
     * @param _selfCitationsCount - The self citation count of the scholar
     * @param _indirectSelfCitationsCount - The indirect self citation count of the scholar
     * @param _totalCitationsCount - The total citation count of the scholar
     * @param _url - The URL of the homepage of the scholar
     * @param _basicProfile - The basic profile of the scholar
     * @param _publicationsByYear - The publications by year data of the scholar
     * @param _publicationsByVenue - The publications by venue data of the scholar
     * @param _citationsByYear - The citations by year data of the scholar
     * @param _citedScholars - The cited scholars data of the scholar
     * @param _authors - The authors of the scholar
     * @param _articles - The articles of the scholar
     */
    constructor(
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
        _citationsByYear: CitationsByYear[],
        _citedScholars: CitedScholar[],
        _authors: Author[],
        _articles: Article[],
    ) 
    {
        super();
        this._hIndex = _hIndex;
        this._hIndexWithoutSelfCitations = _hIndexWithoutSelfCitations;
        this._i10Index = _i10Index;
        this._i10IndexWithoutSelfCitations = _i10IndexWithoutSelfCitations;
        this._selfCitationsCount = _selfCitationsCount;
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
        this._totalCitationsCount = _totalCitationsCount;
        this._url = _url;

        this._basicProfile = _basicProfile;
        this._publicationsByYear = _publicationsByYear;
        this._publicationsByVenue = _publicationsByVenue;
        this._citationsByYear = _citationsByYear;
        this._citedScholars = _citedScholars;
        this._authors = _authors;
        this._articles = _articles;
    }
    /**
     * Gets expertise
     */
    public get expertise(): Expertise[] 
    {
        return this._expertise;
    }

    /**
     * Sets expertises
     */
    public set expertise(_expertise: Expertise[]) 
    {
        this._expertise = _expertise;
    }

    /**
     * Gets whether h index
     */
    public get hIndex(): number 
    {
        return this._hIndex;
    }

    /**
     * Sets whether h index
     */
    public set hIndex(_hIndex: number) 
    {
        this._hIndex = _hIndex;
    }

    /**
     * Gets whether h index without self citations
     */
    public get hIndexWithoutSelfCitations(): number 
    {
        return this._hIndexWithoutSelfCitations;
    }

    /**
     * Sets whether h index without self citations
     */
    public set hIndexWithoutSelfCitations(_hIndexWithoutSelfCitations: number) 
    {
        this._hIndexWithoutSelfCitations = _hIndexWithoutSelfCitations;
    }

    /**
     * Gets i10 index
     */
    public get i10Index(): number 
    {
        return this._i10Index;
    }

    /**
     * Sets i10 index
     */
    public set i10Index(_i10Index: number) 
    {
        this._i10Index = _i10Index;
    }

    /**
     * Gets i10 index without self citations
     */
    public get i10IndexWithoutSelfCitations(): number 
    {
        return this._i10IndexWithoutSelfCitations;
    }

    /**
     * Sets i10 index without self citations
     */
    public set i10IndexWithoutSelfCitations(_i10IndexWithoutSelfCitations: number) 
    {
        this._i10IndexWithoutSelfCitations = _i10IndexWithoutSelfCitations;
    }

    /**
     * Gets self citations count
     */
    public get selfCitationsCount(): number 
    {
        return this._selfCitationsCount;
    }

    /**
     * Sets self citations count
     */
    public set selfCitationsCount(_selfCitationsCount: number) 
    {
        this._selfCitationsCount = _selfCitationsCount;
    }

    /**
     * Gets indirect self citations count
     */
    public get indirectSelfCitationsCount(): number 
    {
        return this._indirectSelfCitationsCount;
    }

    /**
     * Sets indirect self citations count
     */
    public set indirectSelfCitationsCount(_indirectSelfCitationsCount: number) 
    {
        this._indirectSelfCitationsCount = _indirectSelfCitationsCount;
    }

    /**
     * Gets total citations count
     */
    public get totalCitationsCount(): number 
    {
        return this._totalCitationsCount;
    }

    /**
     * Sets total citations count
     */
    public set totalCitationsCount(_totalCitationsCount: number) 
    {
        this._totalCitationsCount = _totalCitationsCount;
    }

    /**
     * Gets basic profile
     */
    public get basicProfile(): BasicProfile 
    {
        return this._basicProfile;
    }

    /**
     * Sets basic profile
     */
    public set basicProfile(_basicProfile: BasicProfile) 
    {
        this._basicProfile = _basicProfile;
    }

    /**
     * Gets publications by year
     */
    public get publicationsByYear(): PublicationByYear[] 
    {
        return this._publicationsByYear;
    }

    /**
     * Sets publications by year
     */
    public set publicationsByYear(_publicationsByYear: PublicationByYear[]) 
    {
        this._publicationsByYear = _publicationsByYear;
    }

    /**
     * Gets publications by venue
     */
    public get publicationsByVenue(): PublicationByVenue[] 
    {
        return this._publicationsByVenue;
    }

    /**
     * Sets publications by venue
     */
    public set publicationsByVenue(_publicationsByVenue: PublicationByVenue[]) 
    {
        this._publicationsByVenue = _publicationsByVenue;
    }

    /**
     * Gets citations by year
     */
    public get citationsByYear(): CitationsByYear[] 
    {
        return this._citationsByYear;
    }

    /**
     * Sets citations by year
     */
    public set citationsByYear(_citationsByYear: CitationsByYear[]) 
    {
        this._citationsByYear = _citationsByYear;
    }

    /**
     * Gets cited scholars
     */
    public get citedScholars(): CitedScholar[] 
    {
        return this._citedScholars;
    }

    /**
     * Sets cited scholars
     */
    public set citedScholars(_citedScholar: CitedScholar[]) 
    {
        this._citedScholars = _citedScholar;
    }

    /**
     * Gets authors
     */
    public get authors(): Author[] 
    {
        return this._authors;
    }

    /**
     * Sets authors
     */
    public set authors(_authors: Author[]) 
    {
        this._authors = _authors;
    }

    /**
     * Gets articles
     */
    public get articles(): Article[] 
    {
        return this._articles;
    }

    /**
     * Sets articles
     */
    public set articles(_articles: Article[]) 
    {
        this._articles = _articles;
    }

    /**
     * Gets url
     */
    public get url(): string 
    {
        return this._url;
    }

    /**
     * Sets url
     */
    public set url(newUrl: string) 
    {
        this._url = newUrl;
    }
}
