import { Article } from '../models/articles/Article';
import { APIArticle, GetUsersResponse } from '../models/api/API';
import { DataSource } from './DataSource';
import axios, { AxiosResponse } from 'axios';

export class SemanticScholarSource implements DataSource {
    //private queryResultsMapping : Map<string, string>;
    private idAPIAuthorMapping: Map<string, Promise<GetUsersResponse>>;

    private static instance: SemanticScholarSource;

    public static getInstance(): SemanticScholarSource {
        if (!SemanticScholarSource.instance) {
            SemanticScholarSource.instance = new SemanticScholarSource();
        }
        return SemanticScholarSource.instance;
    }

    private constructor() {
        //this.queryResultsMapping = new Map<string, string>();
        this.idAPIAuthorMapping = new Map<string, Promise<GetUsersResponse>>();
        const promise: Promise<GetUsersResponse> = this.getUsers('walter tichy');
        this.idAPIAuthorMapping.set('1679754', promise);
    }

    private async getUsers(query: string): Promise<GetUsersResponse> {
        try {
            const { data }: AxiosResponse<GetUsersResponse, object> = await axios.get<GetUsersResponse>(
                'https://api.semanticscholar.org/graph/v1/author/search?query=' +
                    query +
                    '&fields=authorId,url,name,aliases,affiliations,homepage,paperCount,citationCount,hIndex,papers.paperId,papers.url,papers.title,papers.abstract,papers.venue,papers.year,papers.referenceCount,papers.citationCount,papers.isOpenAccess,papers.fieldsOfStudy,papers.publicationTypes,papers.publicationDate,papers.journal,papers.authors&limit=5',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            return data;
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
        query;
        return {} as Promise<string[]>;
    }
    async fetchHIndex(authorId: string): Promise<number> {
        authorId;
        return await this.idAPIAuthorMapping.get('1679754').then((data: GetUsersResponse) => {
            return data.data[0].hIndex;
        });
    }

    async fetchI10Index(authorId: string): Promise<number> {
        authorId;
        return {} as Promise<number>;
    }
    async fetchArticles(authorId: string): Promise<Article[]> {
        authorId;
        return {} as Promise<Article[]>;
    }
    async hasSelfCitation(article: Article, authorId: string): Promise<boolean> {
        article;
        authorId;
        return {} as Promise<boolean>;
    }
    async fetchName(authorId: string): Promise<string> {
        return await this.idAPIAuthorMapping.get(authorId).then((data: GetUsersResponse) => {
            return data.data[0].name;
        });
    }
    async fetchAffiliation(authorId: string): Promise<string[]> {
        return await this.idAPIAuthorMapping.get(authorId).then((data: GetUsersResponse) => {
            return data.data[0].affiliations;
        });
    }
    async fetchCitation(authorId: string): Promise<number> {
        return await this.idAPIAuthorMapping.get(authorId).then((data: GetUsersResponse) => {
            return +data.data[0].citationCount;
        });
    }

    //TODO: Implement ArticlesCiting
    async fetchArticlesCiting(authorId: string): Promise<Map<Article, Article[]>> {
        authorId;
        return {} as Promise<Map<Article, Article[]>>;
    }
}
