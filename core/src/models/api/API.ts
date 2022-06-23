export interface APIJournal {
  volume?: string;
  pages?: string;
  name?: string;
}
interface APICoAuthor {
  authorId: string;
  name: string;
}
export interface APIArticle {
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
    authors?: APICoAuthor[]
}

export interface APIAuthor {
  authorId: string;
  url: string;
  name: string;
  aliases: string[];
  affiliations: string[];
  homepage: string;
  paperCount: string;
  citationCount: string;
  hIndex: number;
  papers: APIArticle[];
};

export interface GetUsersResponse {
  total: number;
  offset: number;
  next: number;
  data: APIAuthor[];
};
