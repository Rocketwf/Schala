export interface APIArticle {
    /**
     * It represents the title of the article
     */
    _title: string;
    /**
     * It represents the venue of the article
     */
    _venue: string;
    /**
     * It represents the publication year of the article
     */
    _publicationYear: number;
    /**
     * It represents the citation number of the article
     */
    _citationCount: number;
    /**
     * It represents the url of the article
     */
    _url: string;
    /**
     * It represents the abstract of the article
     */
    _abstract: string;
    /**
     * It represents the co-authors of the article
     */
    _articlesCoAuthors: APICoAuthor[];
}
export interface APICoAuthor {
    /**
     * It represents the id of the co-author
     */
    _id: string;
    /**
     * It represents the name of the co-author
     */
    _name: string;
}

export interface APIAuthor {
    /**
     * It represents the name of the author
     */
    _name: string;
    /**
     * It represents the joint publication number of the author
     */
    _jointPublicationCount: number;
    /**
     * It represents the h-index of the author
     */
    _hIndex: number;
}
export interface APIPaper {
    /**
     * It represents the title of the paper
     */
    _title: string;
    /**
     * It represents the venue of the paper
     */
    _venue: string;
    /**
     * It represents the publication year of the paper
     */
    _publicationYear: number;
    /**
     * It represents the citation number of the paper
     */
    _citationCount: number;
    /**
     * It represents the url of the paper
     */
    _url: string;
    /**
     * It represents the co-authors of the paper
     */
    _coAuthors: string[];
}
export interface APIBasicAuthor {
    /**
     * It represents the id of the author
     */
    _authorId: string;
    /**
     * It represents the name of the author
     */
    _name: string;
    /**
     * It represents the aliases of the author
     */
    _aliases: string[];
    /**
     * It represents the affiliations of the author
     */
    _affiliations: string[];
    /**
     * It represents the paper count of the author
     */
    _paperCount: number;
    /**
     * It represents the citation count of the author
     */
    _citationCount: number;
}

export interface APIPublicationByYear {
    /**
     * It represents the year of the publication
     */
    _year: number;
    /**
     * It represents the count of the publication
     */
    _publicationsCount: number;
}

export interface APIFullProfile {
    /**
     * It represents the expertise of the full profile
     */
    _expertise: string[];
    /**
     * It represents the h-index of the full profile
     */
    _hIndex: number;
    /**
     * It represents the h-index without self-citations of the full profile
     */
    _hIndexWithoutSelfCitations: number;
    /**
     * It represents the i10-index of the full profile
     */
    _i10Index: number;
    /**
     * It represents the i10-index without self-citations of the full profile
     */
    _i10IndexWithoutSelfCitations: number;
    /**
     * It represents the self-citations count of the full profile
     */
    _selfCitationsCount: number;
    /**
     * It represents the indirect self-citations count of the full profile
     */
    _indirectSelfCitationsCount: number;
    /**
     * It represents the total citations count of the full profile
     */
    _totalCitationsCount: number;
    /**
     * It represents the url of the website  of the full profile
     */
    _url: string;
    /**
     * It represents the basic information of the full profile
     */
    _basicProfile: APIBasicProfile;
    /**
     * It represents the publications by year of the full profile
     */
    _publicationsByYear: APIPublicationByYear[];
    /**
     * It represents the publications by venue of the full profile
     */
    _publicationsByVenue: APIPublicationByVenue[];
    /**
     * It represents the citations by year of the full profile
     */
    _citationsByYear: APICitationsByYear[];
    /**
     * It represents the cited scholars of the full profile
     */
    _citedScholars: APICitedScholar[];
    /**
     * It represents the authors of the full profile
     */
    _authors: APIAuthor[];
    /**
     * It represents the articles of the full profile
     */
    _articles: APIArticle[];
}
export interface APICitationsByYear {
    /**
     * It represents the year of citations
     */
    _year: number;
    /**
     * It represents the count of selfCitations
     */
    _selfCitationsCount: number;
    /**
     * It represents the count of  indirect selfCitations
     */
    _indirectSelfCitationsCount: number;
    /**
     * It represents the count of total citations
     */
    _totalCitationCount: number;
}

export interface APIPublicationByVenue {
    /**
     * It represents the venue of publication
     */
    _venue: string;
    /**
     * It represents the count of publications
     */
    _publicationCount: number;
}

export interface APICitedScholar {
    /**
     * It represents the name of cited scholars
     */
    _name: string;
    /**
     * It represents the count of citations of the cited scholar
     */
    _citationCount: number;
}

export interface APICitationByYear {
    /**
     * It represents the year of citation
     */
    _year: number;
    /**
     * It represents the count of self citations
     */
    _selfCitationsCount: number;
    /**
     * It represents the count of indirect self citations
     */
    _indirectSelfCitationsCount: number;
    /**
     * It represents the count of total citations
     */
    _totalCitationsCount: number;
}
export interface APIBasicProfile {
    /**
     * It represents the id of the basic profile
     */
    _id: string;
    /**
     * It represents the name of the basic profile
     */
    _name: string;
    /**
     * It represents the affiliations of the basic profile
     */
    _affiliations: string[];
    /**
     * It represents the number of total citations of the basic profile
     */
    _totalCitations: number;
    /**
     * It represents the paper count of the basic profile
     */
    _paperCount: number;
    /**
     * It represents the picture url of the basic profile
     */
    _pictureUrl: string;
}
