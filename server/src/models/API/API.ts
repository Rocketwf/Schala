/**
 * The APISearch is a data structure holding response of the api
 * query for the profiles.
 */
export interface APISearch {
    total: number;
    offset: number;
    next: number;
    data: APIBasicAuthor[];
}

/**
 * The APIBasicAuthor is a data structure holding the basic
 * information of a scholar
 */
export interface APIBasicAuthor {
    authorId: string;
    name: string;
    aliases: string[];
    affiliations: string[];
    paperCount: string;
    citationCount: string;
    profilePicture?: string;
}
/**
 * The APIAuthor is a datastructure holding the complete information
 * of a scholar
 */
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
    timeStamp?: number;
}

/**
 * The PaperId is a data structure holding the ID of a paper
 */
export interface PaperId {
    paperId: string;
}

/**
 * The APIPaper is a data structure holding the complete
 * information for a paper
 */
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

/**
 * The APIRefCit is a data structure holding the information
 * of the referenced and the cited papers of a paper
 */
export interface APIRefCit {
    paperId: string;
    authors: APICoAuthor[];
    title: string;
    year: number;
}
/**
 * The APICoAuthor is a data structure holding the
 * information of a co-author of a scholar
 */
export interface APICoAuthor {
    authorId: string;
    name: string;
    aliases?: string[];
    hIndex?: number;
}

/**
 * The APIJournal is a data structure holding the
 * information of a journal
 */
export interface APIJournal {
    volume?: string;
    pages?: string;
    name?: string;
}
