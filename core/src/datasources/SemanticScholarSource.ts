import { Article } from '../models/articles/Article';
import { PublicationByYear, PublicationByVenue, CitedScholar, CitationByYear } from '../models/profile/Profile';
import { APIBasicProfile, APIFullProfile } from '../models/api/API';
import { DataSource } from './DataSource';
import axios, { AxiosResponse } from 'axios';
import { BasicProfile, FullProfile } from '../models';

enum ENDPOINTS {
    SEARCHRESULTS = 'searchResults',
    FULLPROFILE = 'fullprofile',
}

export class SemanticScholarSource implements DataSource {
    private URL: string = 'http://localhost';
    private PORT: number = 3000;

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
                    this.URL + ':' + this.PORT + '/' + ENDPOINTS.SEARCHRESULTS + '?query=' + query,
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
                const { data: fp }: AxiosResponse<APIFullProfile, object> = await axios.get<APIFullProfile>(
                    this.URL + ':' + this.PORT + '/' + ENDPOINTS.FULLPROFILE + '?id=' + profileId,
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );
                const basicProfile: BasicProfile = new BasicProfile(
                    fp.basicProfile.id,
                    fp.basicProfile.name,
                    fp.basicProfile.affiliation,
                    fp.basicProfile.totalCitations,
                    fp.basicProfile.pictureURL,
                );
                const articles: Article[] = new Array<Article>();
                for (const art of fp.articles) {
                    articles.push(
                        new Article(
                            art.title,
                            art.venue,
                            art.publicationYear,
                            art.citationCount,
                            art.url,
                            art.coAuthors,
                        ),
                    );
                }
                const pby: PublicationByYear[] = new Array<PublicationByYear>();
                for (const apiPby of fp.publicationsByYear) {
                    pby.push(new PublicationByYear(apiPby.year, apiPby.publicationsCount));
                }
                const pbv: PublicationByVenue[] = new Array<PublicationByVenue>();
                for (const apiPbv of fp.publicationsByVenue) {
                    pbv.push(new PublicationByVenue(apiPbv.venue, apiPbv.publicationCount));
                }
                const cby: CitationByYear[] = new Array<CitationByYear>();
                for (const apiCby of fp.citationsByYear) {
                    cby.push(
                        new CitationByYear(
                            apiCby.year,
                            apiCby.selfCitationsCount,
                            apiCby.indirectSelfCitationsCount,
                            apiCby.totalCitationsCount,
                        ),
                    );
                }
                const citedScholars: CitedScholar[] = new Array<CitedScholar>();
                for (const apiCs of fp.citedScholars) {
                    citedScholars.push(new CitedScholar(apiCs.name, apiCs.citationCount));
                }

                const fullProfile: FullProfile = new FullProfile(
                    basicProfile,
                    fp.expertise,
                    fp.hIndex,
                    fp.i10Index,
                    articles,
                    pby,
                    pbv,
                    cby,
                    citedScholars,
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
