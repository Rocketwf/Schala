import { Article } from '../models/articles/Article';
import { GetUsersResponse, APIAuthor } from '../models/api/API';
import { DataSource } from './DataSource';
import axios from 'axios';

export class SemanticScholarSource implements DataSource {
    private queryResultsMapping: Map<string, Array<string>>;
    private idAPIAuthorMapping: Map<string, Promise<APIAuthor[]>>;

    private static instance: SemanticScholarSource;

    public static getInstance(): SemanticScholarSource {
        if (!SemanticScholarSource.instance) {
            SemanticScholarSource.instance = new SemanticScholarSource();
        }
        return SemanticScholarSource.instance;
    }

    private constructor() {
        this.queryResultsMapping = new Map<string, Array<string>>();
        this.idAPIAuthorMapping = new Map<string, Promise<APIAuthor[]>>();
    }

    private async getAuthors(query: string): Promise<APIAuthor[]> {
        try {
            const { data } = await axios.get<GetUsersResponse>(
                'https://api.semanticscholar.org/graph/v1/author/search?query=' +
                    query +
                    '&fields=authorId,url,name,aliases,affiliations,homepage,paperCount,citationCount,hIndex,papers.paperId,papers.url,papers.title,papers.abstract,papers.venue,papers.year,papers.referenceCount,papers.citationCount,papers.isOpenAccess,papers.fieldsOfStudy,papers.publicationTypes,papers.publicationDate,papers.journal,papers.authors&limit=5',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            return data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                throw new Error(error.message);
            } else {
                console.log('unexpected error: ', error);
                throw new Error('TODO: Implement me');
            }
        }
    }
    async fetchAuthorIds(query: string): Promise<string[]> {
        //this.queryResultsMapping.set(query, new Array<string>());
        //this.getAuthors(query).then((authors) => {
        //authors.forEach((author) => {
        //this.queryResultsMapping.get(query).push(author.authorId);
        //});
        //});
        //const results: Promise<string[]> = this.getAuthors(query);
        //results.then((resultsStringArray) => {
        //this.se;
        //});

        query;
        return {} as Promise<string[]>;
    }
    async fetchHIndex(authorId: string): Promise<number> {
        authorId;
        return await this.idAPIAuthorMapping.get('1679754').then((data) => {
            return data[0].hIndex;
        });
    }

    fetchI10Index(authorId: string): Promise<number> {
        authorId;
        return {} as Promise<number>;
    }
    fetchArticles(authorId: string): Promise<Article[]> {
        authorId;
        return {} as Promise<Article[]>;
    }
    hasSelfCitation(article: Article, authorId: string): Promise<boolean> {
        article;
        authorId;
        return {} as Promise<boolean>;
    }
    async fetchName(authorId: string): Promise<string> {
        return await this.idAPIAuthorMapping.get(authorId).then((data) => {
            return data[0].name;
        });
    }
    async fetchAffiliation(authorId: string): Promise<string[]> {
        return await this.idAPIAuthorMapping.get(authorId).then((data) => {
            return data[0].affiliations;
        });
    }
    async fetchCitation(authorId: string): Promise<string> {
        return await this.idAPIAuthorMapping.get(authorId).then((data) => {
            return data[0].citationCount;
        });
    }
}
