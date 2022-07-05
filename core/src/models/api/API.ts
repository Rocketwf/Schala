export interface APIJournal {
    volume?: string;
    pages?: string;
    name?: string;
}

export interface APIArticle {
    title: string;
    venue: string;
    publicationYear: number;
    citationCount: number;
    url: string;
    coAuthors: string[];
}

export interface APICoAuthor {
    authorId: string;
    name: string;
    aliases?: string[];
    hIndex?: number;
}
export interface APIRefCit {
    paperId: string;
    authors: APICoAuthor[];
    title: string;
    year: number;
}
export interface APIPapers {
    offset: number;
    data: APIPaper[]; //<<interface>>Paperid in class diagram
}
export interface APIPaper {
    paperId: string;
    url?: string;
    title: string;
    abstract?: string;
    venue?: string;
    year?: number;
    referenceCount?: number;
    citationCount?: number;
    isOpenAccess?: boolean;
    fieldsOfStudy?: string[];
    publicationTypes?: string[];
    publicationDate?: string;
    journal?: APIJournal;
    authors?: APICoAuthor[];
    citations: APIRefCit[];
    references: APIRefCit[];
}
/* ??
export interface APIAuthorExtra {
    url: string;
    homepage: string;
    hIndex: number;
}*/
export interface APIBasicAuthor {
    authorId: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: number;
    citationCount: number;
}
/*
export interface APIAuthorCombined {
    authorId: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: string;
    citationCount: string;
    url: string;
    homepage: string;
    hIndex: number;
}
*/
export interface APIAuthor {
    authorId: string;
    url: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: string;
    citationCount: string;
    homepage: string;
    hIndex: number;
}

export interface APISearch {
    total: number;
    offset: number;
    next: number;
    data: APIBasicAuthor[];
}

export interface APIPublicationByYear {
    year: number;
    publicationsCount: number;
}

export interface APIFullProfile {
    expertise: string[];
    hIndex: number;
    hIndexWithoutSelfCitations: number;
    i10Index: number;
    i10IndexWithoutSelfCitations: number;
    basicProfile: APIBasicProfile;
    citedScholar: APICitedScholar;
    citationByYear: APICitationByYear;
    publicationByVenue: APIPublicationByVenue;
    publicationByYear: APIPublicationByYear;
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
