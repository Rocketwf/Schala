export interface APIArticle {
    /**
     * Represents the title of the article as a string
     */
    _title: string;
    /**
     * Represents the venue of the article as a string
     */
    _venue: string;
    /**
     * Represents the publication year of the article as a number
     */
    _publicationYear: number;
    /**
     * Represents the citation number of the article as a number
     */
    _citationCount: number;
    /**
     * Represents the url of the article as a number
     */
    _url: string;
    /**
     * Represents the abstract of the article as a string
     */
    _abstract: string;
    /**
     * Represents the co-authors of the article as a APICoAuthor array
     */
    _articlesCoAuthors: APICoAuthor[];
}
export interface APICoAuthor {
    /**
     * Represents the id of the co-author as a string
     */
    _id: string;
    /**
     * Represents the name of the co-author as a string
     */
    _name: string;
}

export interface APIAuthor {
    /**
     * Represents the name of the author as a string
     */
    _name: string;
    /**
     * Represents the joint publication number of the author as a number
     */
    _jointPublicationCount: number;
    /**
     * Represents the h-index of the author as a number
     */
    _hIndex: number;
}
export interface APIPaper {
    /**
     * Represents the title of the paper as a string
     */
    _title: string;
    /**
     * Represents the venue of the paper as a string
     */
    _venue: string;
    /**
     * Represents the publication year of the paper as a number
     */
    _publicationYear: number;
    /**
     * Represents the citation number of the paper as a number
     */
    _citationCount: number;
    /**
     * Represents the url of the paper as a string
     */
    _url: string;
    /**
     * Represents the co-authors of the paper as a string array
     */
    _coAuthors: string[];
}
export interface APIBasicAuthor {
    /**
     * Represents the id of the author as a string
     */
    _authorId: string;
    /**
     * Represents the name of the author as a string
     */
    _name: string;
    /**
     * Represents the aliases of the author as a string array
     */
    _aliases: string[];
    /**
     * Represents the affiliations of the author as a string array
     */
    _affiliations: string[];
    /**
     * Represents the paper count of the author as a number
     */
    _paperCount: number;
    /**
     * Represents the citation count of the author as a number
     */
    _citationCount: number;
}

export interface APIPublicationByYear {
    /**
     * Represents the year of the publication as a number
     */
    _year: number;
    /**
     * Represents the count of the publication as a number
     */
    _publicationsCount: number;
}

export interface APIFullProfile {
    /**
     * Represents the expertise of the full profile as a string array
     */
    _expertise: string[];
    /**
     * Represents the h-index of the full profile as a number
     */
    _hIndex: number;
    /**
     * Represents the h-index without self-citations of the full profile as number
     */
    _hIndexWithoutSelfCitations: number;
    /**
     * Represents the i10-index of the full profile as a number
     */
    _i10Index: number;
    /**
     * Represents the i10-index without self-citations of the full profile as a number
     */
    _i10IndexWithoutSelfCitations: number;
    /**
     * Represents the self-citations count of the full profile as a number
     */
    _selfCitationsCount: number;
    /**
     * Represents the indirect self-citations count of the full profile as a number
     */
    _indirectSelfCitationsCount: number;
    /**
     * Represents the total citations count of the full profile as a number
     */
    _totalCitationsCount: number;
    /**
     * Represents the url of the website  of the full profile as a string
     */
    _url: string;
    /**
     * Represents the basic information of the full profile as a APIBasicProfile
     */
    _basicProfile: APIBasicProfile;
    /**
     * Represents the publications by year of the full profile as a APIPublicationByYear array
     */
    _publicationsByYear: APIPublicationByYear[];
    /**
     * Represents the publications by venue of the full profile as a APIPublicationByVenue array
     */
    _publicationsByVenue: APIPublicationByVenue[];
    /**
     * Represents the citations by year of the full profile as a APICitationByYear array
     */
    _citationsByYear: APICitationsByYear[];
    /**
     * Represents the cited scholars of the full profile as a APICitedScholar array
     */
    _citedScholars: APICitedScholar[];
    /**
     * Represents the authors of the full profile as a APIAuthor array
     */
    _authors: APIAuthor[];
    /**
     * Represents the articles of the full profile as a APIArticle array
     */
    _articles: APIArticle[];
}
export interface APICitationsByYear {
    /**
     * Represents the year of citations as a number
     */
    _year: number;
    /**
     * Represents the count of selfCitations as a number
     */
    _selfCitationsCount: number;
    /**
     * Represents the count of  indirect selfCitations as a number
     */
    _indirectSelfCitationsCount: number;
    /**
     * Represents the count of total citations as a number
     */
    _totalCitationCount: number;
}

export interface APIPublicationByVenue {
    /**
     * Represents the venue of publication as a string
     */
    _venue: string;
    /**
     * Represents the count of publications as a number
     */
    _publicationCount: number;
}

export interface APICitedScholar {
    /**
     * Represents the name of cited scholars as a string
     */
    _name: string;
    /**
     * Represents the count of citations of the cited scholar as a number
     */
    _citationCount: number;
}

export interface APICitationByYear {
    /**
     * Represents the year of citation as a number
     */
    _year: number;
    /**
     * Represents the count of self citations as a number
     */
    _selfCitationsCount: number;
    /**
     * Represents the count of indirect self citations as a number
     */
    _indirectSelfCitationsCount: number;
    /**
     * Represents the count of total citations as a number
     */
    _totalCitationsCount: number;
}
export interface APIBasicProfile {
    /**
     * Represents the id of the basic profile as a string
     */
    _id: string;
    /**
     * Represents the name of the basic profile as a string
     */
    _name: string;
    /**
     * Represents the affiliations of the basic profile as a string array
     */
    _affiliations: string[];
    /**
     * Represents the number of total citations of the basic profile as a number
     */
    _totalCitations: number;
    /**
     * Represents the paper count of the basic profile as a number
     */
    _paperCount: number;
    /**
     * Represents the picture url of the basic profile as a string
     */
    _pictureUrl: string;
}
