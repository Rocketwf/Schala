export interface APIJournal {
    volume?: string;
    pages?: string;
    name?: string;
}
export interface APICoAuthor {
    authorId: string;
    name: string;
}
export interface APIReference {
    paperId: string;
    authors: APICoAuthor[];
}
export interface APIPapers {
    offset: number;
    data: APIPaper[];
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
    journal?: APIJournal[];
    authors?: APICoAuthor[];
    references: APIReference[];
}

export interface APIAuthorExtra {
    url: string;
    homepage: string;
    hIndex: number;
}
export interface APIBasicAuthor {
    authorId: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: string;
    citationCount: string;
}

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

export interface APIAuthor {
    basicAuthor: APIBasicAuthor;
    authorExtra: APIAuthorExtra;
    papers: APIPapers;
    filled: boolean;
}

export interface APISearch {
    total: number;
    offset: number;
    next: number;
    data: APIBasicAuthor[];
}
