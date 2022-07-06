export interface APIArticle {
    title: string;
    venue: string;
    publicationYear: number;
    citationCount: number;
    url: string;
    coAuthors: string[];
}

export interface APIAuthor {
    name: string;
    jointPublicationCount: number;
    hIndex: number;
}
export interface APIPaper {
    title: string;
    venue: string;
    publicationYear: number;
    citationCount: number;
    url: string;
    coAuthors: string[];
}
export interface APIBasicAuthor {
    authorId: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: number;
    citationCount: number;
}

export interface APIPublicationByYear {
    year: number;
    publicationsCount: number;
}

export interface APIFullProfile {
    basicProfile: APIBasicProfile;
    expertise: string[];
    hIndex: number;
    hIndexWithoutSelfCitations: number;
    i10Index: number;
    i10IndexWithoutSelfCitations: number;
    citedScholars: APICitedScholar[];
    citationsByYear: APICitationByYear[];
    publicationsByVenue: APIPublicationByVenue[];
    publicationsByYear: APIPublicationByYear[];
    articles: APIArticle[];
}

export interface APIPublicationByVenue {
    venue: string;
    publicationCount: number;
}

export interface APICitedScholar {
    name: string;
    citationCount: number;
}

export interface APICitationByYear {
    year: number;
    selfCitationsCount: number;
    indirectSelfCitationsCount: number;
    totalCitationsCount: number;
}
export interface APIBasicProfile {
    id: string;
    name: string;
    affiliation: string[];
    totalCitations: number;
    pictureURL: string;
}
