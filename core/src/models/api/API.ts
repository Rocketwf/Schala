export interface APIArticle {
    _title: string;
    _venue: string;
    _publicationYear: number;
    _citationCount: number;
    _url: string;
    _coAuthors: string[];
}

export interface APIAuthor {
    _name: string;
    _jointPublicationCount: number;
    _hIndex: number;
}
export interface APIPaper {
    _title: string;
    _venue: string;
    _publicationYear: number;
    _citationCount: number;
    _url: string;
    _coAuthors: string[];
}
export interface APIBasicAuthor {
    _authorId: string;
    _name: string;
    _aliases: string[];
    _affiliations: string[];
    _paperCount: number;
    _citationCount: number;
}

export interface APIPublicationByYear {
    _year: number;
    _publicationsCount: number;
}

export interface APIFullProfile {
    _expertise: string[];
    _hIndex: number;
    _hIndexWithoutSelfCitations: number;
    _i10Index: number;
    _i10IndexWithoutSelfCitations: number;
    _selfCitationsCount: number;
    _indirectSelfCitationsCount: number;
    _totalCitationsCount: number;
    _basicProfile: APIBasicProfile;
    _publicationsByYear: APIPublicationByYear[];
    _publicationsByVenue: APIPublicationByVenue[];
    _citationsByYear: APICitationsByYear[];
    _citedScholars: APICitedScholar[];
    _authors: APIAuthor[];
    _articles: APIArticle[];
}
export interface APICitationsByYear {
    _year: number;
    _selfCitationsCount: number;
    _indirectSelfCitationsCount: number;
    _totalCitationCount: number;
}

export interface APIPublicationByVenue {
    _venue: string;
    _publicationCount: number;
}

export interface APICitedScholar {
    _name: string;
    _citationCount: number;
}

export interface APICitationByYear {
    _year: number;
    _selfCitationsCount: number;
    _indirectSelfCitationsCount: number;
    _totalCitationsCount: number;
}
export interface APIBasicProfile {
    _id: string;
    _name: string;
    _affiliations: string[];
    _totalCitations: number;
    _pictureURL: string;
}
