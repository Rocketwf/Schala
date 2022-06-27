import { Article, CoAuthor } from '../models/articles/Article';
import {
    APIAuthor,
    APIAuthorCombined,
    APIAuthorExtra,
    APIBasicAuthor,
    APIPapers,
    APIPaper,
    APIJournal,
    APICoAuthor,
    APISearch,
} from '../models/api/API';
import { DataSource } from './DataSource';
import axios, { AxiosResponse } from 'axios';

export class SemanticScholarSource implements DataSource {
    private queryResultsMapping: Map<string, string[]>;
    private authorIdAPIAuthor: Map<string, APIAuthor>;

    private static instance: SemanticScholarSource;

    public static getInstance(): SemanticScholarSource {
        if (!SemanticScholarSource.instance) {
            SemanticScholarSource.instance = new SemanticScholarSource();
        }
        return SemanticScholarSource.instance;
    }

    private constructor() {
        this.queryResultsMapping = new Map<string, string[]>();
        this.authorIdAPIAuthor = new Map<string, APIAuthor>();
    }
    private async getAndCacheFullAuthor(authorId: string): Promise<APIAuthor> {
        const cachedAuthor: APIAuthor = this.authorIdAPIAuthor.get(authorId);
        let extra: APIAuthorExtra = {} as APIAuthorExtra;
        let basic: APIBasicAuthor = {} as APIBasicAuthor;
        if (cachedAuthor) {
            if (cachedAuthor.filled) {
                return cachedAuthor;
            }
            try {
                const { data: authorExtra }: AxiosResponse<APIAuthorExtra, object> = await axios.get<APIAuthorExtra>(
                    'https://api.semanticscholar.org/graph/v1/author/' + authorId + '?fields=url,homepage,hIndex',
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );

                basic = cachedAuthor.basicAuthor;
                extra = authorExtra;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    throw new Error(error.message);
                } else {
                    console.log('unexpected error: ', error);
                    throw new Error('TODO: Implement me');
                }
            }
        } else {
            const { data: combined }: AxiosResponse<APIAuthorCombined, object> = await axios.get<APIAuthorCombined>(
                'https://api.semanticscholar.org/graph/v1/author/' +
                    authorId +
                    '?fields=authorId,name,aliases,affiliations,paperCount,citationCount,url,homepage,hIndex',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            basic = {
                authorId: combined.authorId,
                name: combined.name,
                aliases: combined.aliases,
                affiliations: combined.affiliations,
                paperCount: combined.paperCount,
                citationCount: combined.citationCount,
            };
            extra = {
                url: combined.url,
                homepage: combined.homepage,
                hIndex: combined.hIndex,
            };
        }
        const { data: papers }: AxiosResponse<APIPapers, object> = await axios.get<APIPapers>(
            'https://api.semanticscholar.org/graph/v1/author/' +
                authorId +
                '/papers/?fields=paperId,url,title,abstract,venue,year,referenceCount,citationCount,isOpenAccess,fieldsOfStudy,publicationTypes,publicationDate,journal,authors,references.paperId,references.authors&limit=1000',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        const fullAuthor: APIAuthor = {
            basicAuthor: basic,
            authorExtra: extra,
            papers: papers,
            filled: true,
        };
        this.authorIdAPIAuthor.set(authorId, fullAuthor);
        return fullAuthor;
    }

    private async getAndCacheSearchResults(query: string): Promise<APIAuthor[]> {
        const apiAuthors: Array<APIAuthor> = new Array<APIAuthor>();
        if (this.queryResultsMapping.has(query)) {
            for (const authorId of this.queryResultsMapping.get(query)) {
                apiAuthors.push(this.authorIdAPIAuthor.get(authorId));
            }
            return apiAuthors;
        }
        try {
            const { data }: AxiosResponse<APISearch, object> = await axios.get<APISearch>(
                'https://api.semanticscholar.org/graph/v1/author/search?query=' +
                    query +
                    '&fields=authorId,name,aliases,affiliations,paperCount,citationCount&limit=1000',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            this.queryResultsMapping.set(query, new Array<string>());

            for (const basicProfile of data.data) {
                const fullAuthor: APIAuthor = {
                    basicAuthor: {
                        authorId: basicProfile.authorId,
                        name: basicProfile.name,
                        aliases: basicProfile.aliases,
                        affiliations: basicProfile.affiliations,
                        paperCount: basicProfile.paperCount,
                        citationCount: basicProfile.citationCount,
                    },
                    authorExtra: { url: '', homepage: '', hIndex: 0 },
                    papers: {} as APIPapers,
                    filled: false,
                };
                this.authorIdAPIAuthor.set(basicProfile.authorId, fullAuthor);
                this.queryResultsMapping.get(query).push(basicProfile.authorId);

                apiAuthors.push(fullAuthor);
            }

            return apiAuthors;
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
        const authors: APIAuthor[] = await this.getAndCacheSearchResults(query);
        return authors.map((author: APIAuthor) => author.basicAuthor.authorId);
    }

    async fetchName(authorId: string): Promise<string> {
        let profile: APIAuthor = this.authorIdAPIAuthor.get(authorId);
        if (!profile) {
            profile = await this.getAndCacheFullAuthor(authorId);
        }
        return profile.basicAuthor.aliases
            ? profile.basicAuthor.aliases[profile.basicAuthor.aliases.length - 1]
            : profile.basicAuthor.name;
    }

    async fetchAffiliations(authorId: string): Promise<string[]> {
        let profile: APIAuthor = this.authorIdAPIAuthor.get(authorId);
        if (!profile) {
            profile = await this.getAndCacheFullAuthor(authorId);
        }
        return profile.basicAuthor.affiliations;
    }
    async fetchCitation(authorId: string): Promise<number> {
        let profile: APIAuthor = this.authorIdAPIAuthor.get(authorId);
        if (!profile) {
            profile = await this.getAndCacheFullAuthor(authorId);
        }
        return +profile.basicAuthor.citationCount;
    }

    async fetchHIndex(authorId: string): Promise<number> {
        const fullAuthor: APIAuthor = await this.getAndCacheFullAuthor(authorId);
        return fullAuthor.authorExtra.hIndex;
    }

    async fetchI10Index(authorId: string): Promise<number> {
        authorId;
        return null;
    }
    async fetchArticles(authorId: string): Promise<Article[]> {
        const fullAuthor: APIAuthor = await this.getAndCacheFullAuthor(authorId);
        return fullAuthor.papers.data.map(
            (apiPaper: APIPaper) =>
                new Article(
                    apiPaper.paperId,
                    apiPaper.title,
                    apiPaper.year,
                    apiPaper.referenceCount,
                    20,
                    '',
                    apiPaper.url,
                    apiPaper.journal ? apiPaper.journal.name : '',
                    apiPaper.authors.map((coAuthor: APICoAuthor) => new CoAuthor(coAuthor.authorId, coAuthor.name, 0)),
                ),
        );
    }
    async hasSelfCitation(article: Article, authorId: string): Promise<boolean> {
        const fullAuthor: APIAuthor = await this.getAndCacheFullAuthor(authorId);
        fullAuthor;
        article;
        authorId;
        return {} as boolean;
    }
}
