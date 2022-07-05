import { Article, Author } from '../models/articles/Article';
import {
    APIAuthor,
    APIBasicAuthor,
    APIPapers,
    APIPaper,
    APICoAuthor,
    APISearch,
    APIRefCit,
    APIBasicProfile,
    APIFullProfile,
    APIArticle,
} from '../models/api/API';
import { DataSource } from './DataSource';
import axios, { AxiosResponse } from 'axios';
import { BasicProfile, FullProfile } from '../models';

export class SemanticScholarSource implements DataSource {
    private _queryResultsMapping: Map<string, BasicProfile[]>;
    private _profileIdFullProfileMapping: Map<string, FullProfile>;
    private static instance: SemanticScholarSource;

    public static getInstance(): SemanticScholarSource {
        if (!SemanticScholarSource.instance) {
            SemanticScholarSource.instance = new SemanticScholarSource();
        }
        return SemanticScholarSource.instance;
    }

    private constructor() {
        this._queryResultsMapping = new Map<string, BasicProfile[]>();
        this._profileIdFullProfileMapping = new Map<string, FullProfile>();
    }

    async fetchSearchResults(query: string): Promise<BasicProfile[]> {
        if (this._queryResultsMapping.has(query)) {
            return this._queryResultsMapping.get(query);
        } else {
            try {
                const { data: bp }: AxiosResponse<APIBasicProfile[], object> = await axios.get<APIBasicProfile[]>(
                    'https://placeholder/searchResults?query=' + query,
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );
                const basicProfiles: BasicProfile[] = new Array<BasicProfile>();
                for (const apiBasicProfile of bp) {
                    const basicProfile: BasicProfile = new BasicProfile(
                        apiBasicProfile.id,
                        apiBasicProfile.name,
                        apiBasicProfile.affiliation,
                        apiBasicProfile.totalCitations,
                        apiBasicProfile.pictureURL,
                    );
                    basicProfiles.push(basicProfile);
                }
                this._queryResultsMapping.set(query, basicProfiles);
                return basicProfiles;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    throw new Error(error.message);
                } else {
                    console.log('unexpected error: ', error);
                    throw new Error('Unexpected error');
                }
            }
        }
    }

    async fetchFullProfile(profileId: string): Promise<FullProfile> {
        if (this._profileIdFullProfileMapping.has(profileId)) {
            return this._profileIdFullProfileMapping.get(profileId);
        } else {
            try {
                const { data: fp }: AxiosResponse<APIFullProfile[], object> = await axios.get<APIFullProfile[]>(
                    'https://placeholder/author/' +
                        profileId +
                        '?fields=authorId,name,aliases,affiliations,paperCount,citationCount,url,homepage,hIndex',
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );
                const { data: articles }: AxiosResponse<APIArticle[], object> = await axios.get<APIArticle[]>(
                    'https://placeholder/author/' +
                        profileId +
                        '/articles/?fields=title,venue,title,publicationYear,citationCount,url,coAuthors',
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );
                const articleTemp: Array<Article> = new Array<Article>();
                for (const apiPaper of articles) {
                    articleTemp.push(
                        new Article(
                            apiPaper.title,
                            apiPaper.venue,
                            apiPaper.publicationYear,
                            apiPaper.citationCount,
                            apiPaper.url,
                            apiPaper.coAuthors,
                        ),
                    );
                }
                const tempBasicProfile: BasicProfile = new BasicProfile(
                    fp[0].basicProfile.id,
                    fp[0].basicProfile.name,
                    fp[0].basicProfile.affiliation,
                    fp[0].basicProfile.totalCitations,
                    fp[0].basicProfile.pictureURL,
                );

                const fullProfile: FullProfile = new FullProfile(
                    tempBasicProfile,
                    fp[0].expertise,
                    fp[0].hIndex,
                    fp[0].i10Index,
                    articleTemp,
                    fp[0].publicationByYear,
                    fp[0].publicationByVenue,
                    fp[0].citationByYear,
                    fp[0].citedScholar,
                );
                this._profileIdFullProfileMapping.set(profileId, fullProfile);
                return fullProfile;
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
    }
}
