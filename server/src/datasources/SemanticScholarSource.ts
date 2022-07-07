import { DataSource } from './DataSource';
import { APISearch, APIPaper, APIAuthor, APIBasicAuthor } from '../models/API';
import rateLimit, { RateLimitedAxiosInstance } from 'axios-rate-limit';
import axios, { AxiosResponse } from 'axios';

const http: RateLimitedAxiosInstance = rateLimit(axios.create(), { maxRequests: 99, perMilliseconds: 1000 });
http.defaults.headers.common['x-api-key'] = process.env.SCHALA_API_KEY ? process.env.SCHALA_API_KEY : '';
export class SemanticScholarSource implements DataSource {
    public async fetchSearchResults(query: string): Promise<APIBasicAuthor[]> {
        try {
            const { data: searchResults }: AxiosResponse<APISearch, object> = await http.get<APISearch>(
                'https://api.semanticscholar.org/graph/v1/author/search?query=' +
                    query +
                    '&fields=authorId,name,aliases,affiliations,paperCount,citationCount&limit=1000',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            return searchResults.data;
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
    public async fetchAuthor(authorId: string): Promise<APIAuthor> {
        try {
            const { data: author }: AxiosResponse<APIAuthor, object> = await http.get<APIAuthor>(
                'https://api.semanticscholar.org/graph/v1/author/' +
                    authorId +
                    '?fields=authorId,url,name,aliases,affiliations,paperCount,citationCount,homepage,hIndex,papers',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            return author;
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
    public async fetchPapers(paperIds: string[]): Promise<APIPaper[]> {
        const papers: APIPaper[] = new Array<APIPaper>();
        const promises: Promise<void | APIPaper>[] = new Array<Promise<void | APIPaper>>();
        try {
            for (const paperId of paperIds) {
                try {
                    promises.push(
                        http
                            .get<APIPaper>(
                                'https://api.semanticscholar.org/graph/v1/paper/' +
                                    paperId +
                                    '?fields=paperId,url,title,abstract,venue,year,referenceCount,citationCount,isOpenAccess,fieldsOfStudy,publicationTypes,publicationDate,citations.paperId,citations.authors,citations.title,citations.year,references.paperId,references.authors,references.title,references.year,authors.authorId,authors.name,authors.aliases,authors.hIndex,journal',
                                {
                                    headers: {
                                        Accept: 'application/json',
                                    },
                                },
                            )
                            .then((paper: AxiosResponse<APIPaper, object>) => {
                                papers.push(paper.data);
                            }),
                    );
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.log('error message: ', error.message);
                    } else {
                        console.log('unexpected error: ', error);
                    }
                }
            }
            await Promise.allSettled(promises);
            return papers;
        } catch (error) {}
    }
}
