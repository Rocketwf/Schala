export class Article 
{
    /**
     * Represents the title value as a string
     */
    private _title: string;
    /**
     * Represents the venue value as a string
     */
    private _venue: string;
    /**
     * Represents the publication year  value as a string
     */
    private _publicationYear: number;
    /**
     * Represents the citations count  value as a number
     */
    private _citationsCount: number;
    /**
     * Represents the url value as a string
     */
    private _url: string;
    /**
     * Represents the co-authors value as ArticleCoAuthor array
     */
    private _coAuthors: ArticleCoAuthor[];
    /**
     * Represents the abstract value as a string
     */
    private _abstract: string;

    private _publicationDate: string;

    private _bibtex: string;

    private _selfCitationsCount: number;

    private _journalName: string;

    private _fieldsOfExpertise: string[];
    /**
     * Creates an instance of article.
     * @param _title - Represents the title value as a string
     * @param _venue - Represents the venue value as a string
     * @param _year - Represents the publication year value as a number
     * @param _citationsCount - Represents the citations count value as a number
     * @param _url - Represents the url value as a number
     * @param _coAuthors - Represents the co-authors value as ArticleCoAuthor array
     * @param _abstract - Represents the abstract value as a string
     */
    constructor(
        _title: string,
        _venue: string,
        _year: number,
        _citationsCount: number,
        _selfCitationsCount: number,
        _url: string,
        _coAuthors: ArticleCoAuthor[],
        _abstract: string,
        _publicationDate: string,
        _bibtex: string,
        _journalName: string,
        _fieldsOfExpertise: string[],
    ) 
    {
        this._title = _title;
        this._venue = _venue;
        this._publicationYear = _year;
        this._citationsCount = _citationsCount;
        this._selfCitationsCount = _selfCitationsCount;
        this._url = _url;
        this._coAuthors = _coAuthors;
        this._abstract = _abstract;
        this._publicationDate = _publicationDate;
        this._bibtex = _bibtex;
        this._journalName = _journalName;
        this._fieldsOfExpertise = _fieldsOfExpertise;
    }

    /**
     * Getter method of the publicationYear attribute
     */
    public get publicationYear(): number 
    {
        return this._publicationYear;
    }
    /**
     * Setter method of the publicationYear attribute
     */
    public set publicationYear(publicationYear: number) 
    {
        this._publicationYear = publicationYear;
    }
    /**
     * Getter method of the citationCount attribute
     */
    public get citationCount(): number 
    {
        return this._citationsCount;
    }
    /**
     * Setter method of the citationCount attribute
     */
    public set citationCount(newCitationCount: number) 
    {
        this._citationsCount = newCitationCount;
    }
    /**
     * Getter method of the title attribute
     */
    public get title(): string 
    {
        return this._title;
    }
    /**
     * Setter method of the title attribute
     */
    public set title(title: string) 
    {
        this._title = title;
    }
    /**
     * Getter method of the venue attribute
     */
    public get venue(): string 
    {
        return this._venue;
    }
    /**
     * Setter method of the venue attribute
     */
    public set venue(venue: string) 
    {
        this._venue = venue;
    }
    /**
     * Getter method of the coAuthors attribute
     */
    public get coAuthors(): ArticleCoAuthor[] 
    {
        return this._coAuthors;
    }
    /**
     * Setter method of the coAuthors attribute
     */
    public set coAuthors(coAuthors: ArticleCoAuthor[]) 
    {
        this._coAuthors = coAuthors;
    }
    /**
     * Getter method of the url attribute
     */
    public get url(): string 
    {
        return this._url;
    }
    /**
     * Setter method of the url attribute
     */
    public set url(url: string) 
    {
        this._url = url;
    }
    /**
     * Getter method of the abstract attribute
     */
    public get abstract(): string 
    {
        return this._abstract;
    }
    /**
     * Setter method of the abstract attribute
     */
    public set abstract(abstract: string) 
    {
        this._abstract = abstract;
    }

    /**
     * Getter method of the publicationDate attribute
     */
    public get publicationDate(): string 
    {
        return this._publicationDate;
    }

    /**
     * Setter method of the publicationDate attribute
     */
    public set publicationDate(_newDate: string) 
    {
        this._publicationDate = _newDate;
    }

    public get bibtex(): string
    {
        return this._bibtex;
    }
     
    public set bibtex(newBibtex: string) 
    {
        this._bibtex = newBibtex;
    }
    public get selfCitationsCount(): number 
    {
        return this._selfCitationsCount;
    }

    public set selfCitationsCount(v: number) 
    {
        this._selfCitationsCount = v;
    }

    public get journalName(): string 
    {
        return this._journalName;
    }
     
    public set journalName(_newJournalName: string) 
    {
        this._journalName = _newJournalName;
    }

    public get fieldsOfExpertise(): string[] 
    {
        return this._fieldsOfExpertise;
    }
     
    public set fieldsOfExpertise(_newFieldsOfExpertise: string[]) 
    {
        this._fieldsOfExpertise = _newFieldsOfExpertise;
    }
}

export class ArticleCoAuthor 
{
    /**
     * Represents the id value as a string
     */
    private _id: string;
    /**
     * Represents the name as a string
     */
    private _name: string;
    /**
     * Creates an instance of article co author.
     * @param _id - Represents the id value as a string
     * @param _name - Represents the name as a string
     */
    constructor(_id: string, _name: string) 
    {
        this._id = _id;
        this._name = _name;
    }
    /**
     * Getter method of the id attribute
     */
    public get id(): string 
    {
        return this._id;
    }
    /**
     * Setter method of the id attribute
     */
    public set id(v: string) 
    {
        this._id = v;
    }
    /**
     * Getter method of the name attribute
     */
    public get name(): string 
    {
        return this._name;
    }
    /**
     * Setter method of the name attribute
     */
    public set name(v: string) 
    {
        this._name = v;
    }
}
