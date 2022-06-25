import { Article } from '../models/articles/Article';
import { GetUsersResponse, APIAuthor } from '../models/api/API';
import { DataSource } from './DataSource';
import axios, { AxiosResponse } from 'axios';

export class SemanticScholarSource implements DataSource {
    private queryResultsMapping: Map<string, string[]>;
    private authorIdApiAuthor: Map<string, APIAuthor>;

    private static instance: SemanticScholarSource;

    public static getInstance(): SemanticScholarSource {
        if (!SemanticScholarSource.instance) {
            SemanticScholarSource.instance = new SemanticScholarSource();
        }
        return SemanticScholarSource.instance;
    }

    private constructor() {
        this.queryResultsMapping = new Map<string, string[]>();
        this.authorIdApiAuthor = new Map<string, APIAuthor>();
    }

    private async getAuthors(query: string): Promise<APIAuthor[]> {
        try {
            const { data }: AxiosResponse<GetUsersResponse, object> = await axios.get<GetUsersResponse>(
                'https://api.semanticscholar.org/graph/v1/author/search?query=' +
                    query +
                    '&fields=authorId,url,name,aliases,affiliations,homepage,paperCount,citationCount,hIndex,papers.paperId,papers.url,papers.title,papers.abstract,papers.venue,papers.year,papers.referenceCount,papers.citationCount,papers.isOpenAccess,papers.fieldsOfStudy,papers.publicationTypes,papers.publicationDate,papers.journal,papers.authors&limit=100',
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
        const latestResponse: APIAuthor[] = await this.getAuthors(query);
        const authorIds: Array<string> = new Array<string>();
        for (const apiAuthor of latestResponse) {
            authorIds.push(apiAuthor.authorId);
            this.authorIdApiAuthor.set(apiAuthor.authorId, apiAuthor);
        }

        this.queryResultsMapping.set(query, authorIds);
        return authorIds;
    }

    fetchHIndex(authorId: string): number {
        return this.authorIdApiAuthor.get(authorId).hIndex;
    }
    fetchName(authorId: string): string {
        return this.authorIdApiAuthor.get(authorId).aliases
            ? this.authorIdApiAuthor.get(authorId).aliases[this.authorIdApiAuthor.get(authorId).aliases.length - 1]
            : this.authorIdApiAuthor.get(authorId).name;
    }

    fetchAffiliations(authorId: string): string[] {
        return this.authorIdApiAuthor.get(authorId).affiliations;
    }
    fetchCitation(authorId: string): number {
        return +this.authorIdApiAuthor.get(authorId).citationCount;
    }

    fetchI10Index(authorId: string): number {
        authorId;
        return {} as number;
    }
    fetchArticles(authorId: string): Article[] {
        authorId;
        return {} as Article[];
    }
    hasSelfCitation(article: Article, authorId: string): boolean {
        article;
        authorId;
        return {} as boolean;
    }
}
