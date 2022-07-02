import { Article, Author, ReferenceOrCitation } from '../models/articles/Article';
import {
    APIAuthor,
    APIAuthorCombined,
    APIAuthorExtra,
    APIBasicAuthor,
    APIPapers,
    APIPaper,
    APICoAuthor,
    APISearch,
    APIRefCit,
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
        let basic: APIBasicAuthor = {} as APIBasicAuthor;
        let extra: APIAuthorExtra = {} as APIAuthorExtra;
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
                '/papers/?fields=paperId,url,title,abstract,venue,year,referenceCount,citationCount,isOpenAccess,fieldsOfStudy,publicationTypes,publicationDate,journal&limit=1000',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        const {
            data: papersExtra,
        }: AxiosResponse<
            { paperId: string; authors: APICoAuthor[]; citations: APIRefCit[]; references: APIRefCit[] }[],
            object
        > = await axios.get<
            { paperId: string; authors: APICoAuthor[]; citations: APIRefCit[]; references: APIRefCit[] }[]
        >(
            'http://70.34.209.19:3000/papers?authorId=' +
                authorId +
                '&fields=authors,authors.name,authors.hIndex,citations,citations.authors,citations.title,citations.year,references,references.authors,references.year,references.title',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        //citations.paperId,citations.authors,citations.title,citations.year,references.paperId,references.authors,references.title,references.year
        const consistentPapers: APIPaper[] = new Array<APIPaper>();
        for (const paper of papersExtra) {
            const correspondingPaper: APIPaper = papers.data.find((p: APIPaper) => p.paperId === paper.paperId);
            if (correspondingPaper) {
                correspondingPaper.citations = paper.citations;
                correspondingPaper.references = paper.references;
                correspondingPaper.authors = paper.authors;
                consistentPapers.push(correspondingPaper);
            }
        }
        papers.data = consistentPapers;

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

    async fetchWebsite(authorId: string): Promise<string> {
        let profile: APIAuthor = this.authorIdAPIAuthor.get(authorId);
        if (!profile) {
            profile = await this.getAndCacheFullAuthor(authorId);
        }
        return profile.authorExtra.homepage;
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
        return fullAuthor.papers.data.map((apiPaper: APIPaper) => {
            const article: Article = new Article(
                apiPaper.paperId,
                apiPaper.title,
                apiPaper.year,
                '',
                apiPaper.url,
                apiPaper.journal ? apiPaper.journal.name : '',
                apiPaper.abstract,
                apiPaper.authors.map((author: APICoAuthor) => new Author(author.authorId, author.name, author.hIndex)),
                apiPaper.citations.map(
                    (citation: APIRefCit) =>
                        new ReferenceOrCitation(
                            citation.year,
                            citation.title,
                            citation.authors.map((coAuthor: APICoAuthor) => {
                                return new Author(coAuthor.authorId, coAuthor.name);
                            }),
                        ),
                ),
                apiPaper.references.map(
                    (ref: APIRefCit) =>
                        new ReferenceOrCitation(
                            ref.year,
                            ref.title,
                            ref.authors.map((coAuthor: APICoAuthor) => {
                                return new Author(coAuthor.authorId, coAuthor.name);
                            }),
                        ),
                ),
            );
            return article;
        });
    }
}
