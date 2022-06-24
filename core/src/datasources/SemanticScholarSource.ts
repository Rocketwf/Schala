import { Article } from '../models/articles/Article';
import { GetUsersResponse, APIAuthor } from '../models/api/API';
import { DataSource } from './DataSource';
import axios, { AxiosResponse } from 'axios';

export class SemanticScholarSource implements DataSource {
    private queryResultsMapping: Map<string, Promise<Array<APIAuthor>>>;

    private static instance: SemanticScholarSource;

    public static getInstance(): SemanticScholarSource {
        if (!SemanticScholarSource.instance) {
            SemanticScholarSource.instance = new SemanticScholarSource();
        }
        return SemanticScholarSource.instance;
    }

    private constructor() {
        this.queryResultsMapping = new Map<string, Promise<Array<APIAuthor>>>();
    }

    private async getAuthors(query: string): Promise<APIAuthor[]> {
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
        const latestResponse: Promise<APIAuthor[]> = this.getAuthors(query);
        const promise: Promise<string[]> = new Promise<string[]>(
            (resolve: (value: string[] | PromiseLike<string[]>) => void) => {
                const authorIds: Array<string> = new Array<string>();
                latestResponse.then((apiAuthors: APIAuthor[]) => {
                    apiAuthors.forEach((apiAuthor: APIAuthor) => {
                        authorIds.push(apiAuthor.authorId);
                    });
                    resolve(authorIds);
                });
            },
        );

        this.queryResultsMapping.set(query, latestResponse);
        return await promise;
    }

    async fetchHIndex(authorId: string): Promise<number> {
        return await Promise.all(Array.from(this.queryResultsMapping.values())).then(
            (arrayOfResolvedPromisses: APIAuthor[][]) => {
                for (const apiAuthors of arrayOfResolvedPromisses) {
                    for (const apiAuthor of apiAuthors) {
                        if (apiAuthor.authorId === authorId) return apiAuthor.hIndex;
                    }
                }
            },
        );
    }
    async fetchName(authorId: string): Promise<string> {
        return await Promise.all(Array.from(this.queryResultsMapping.values())).then(
            (arrayOfResolvedPromisses: APIAuthor[][]) => {
                for (const apiAuthors of arrayOfResolvedPromisses) {
                    for (const apiAuthor of apiAuthors) {
                        if (apiAuthor.authorId === authorId) return apiAuthor.name;
                    }
                }
            },
        );
    }

    async fetchAffiliations(authorId: string): Promise<string[]> {
        return await Promise.all(Array.from(this.queryResultsMapping.values())).then(
            (arrayOfResolvedPromisses: APIAuthor[][]) => {
                for (const apiAuthors of arrayOfResolvedPromisses) {
                    for (const apiAuthor of apiAuthors) {
                        if (apiAuthor.authorId === authorId) return apiAuthor.affiliations;
                    }
                }
            },
        );
    }
    async fetchCitation(authorId: string): Promise<number> {
        return await Promise.all(Array.from(this.queryResultsMapping.values())).then(
            (arrayOfResolvedPromisses: APIAuthor[][]) => {
                for (const apiAuthors of arrayOfResolvedPromisses) {
                    for (const apiAuthor of apiAuthors) {
                        if (apiAuthor.authorId === authorId) return +apiAuthor.citationCount;
                    }
                }
            },
        );
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
}
