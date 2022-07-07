export interface APISearch {
    total: number;
    offset: number;
    next: number;
    data: APIBasicAuthor[];
}
export interface APIBasicAuthor {
    authorId: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: string;
    citationCount: string;
    profilePicture?: string;
}
export interface APIAuthor {
    authorId: string;
    url: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: number;
    citationCount: number;
    homepage: string;
    hIndex: number;
    papers: APIPaper[];
    profilePicture?: string;
}
export interface PaperId {
    paperId: string;
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
    citations: APIRefCit[];
    references: APIRefCit[];
    authors: APICoAuthor[];
    journal?: APIJournal;
}
export interface APIRefCit {
    paperId: string;
    authors: APICoAuthor[];
    title: string;
    year: number;
}
export interface APICoAuthor {
    authorId: string;
    name: string;
    aliases?: string[];
    hIndex?: number;
}
export interface APIJournal {
    volume?: string;
    pages?: string;
    name?: string;
}
