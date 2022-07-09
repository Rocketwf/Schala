import { Article, ArticleCoAuthor } from '../models/articles/Article';
import { Author, PublicationByYear, PublicationByVenue, CitedScholar, CitationByYear } from '../models/profile/Profile';
import { APIBasicProfile, APICoAuthor, APIFullProfile } from '../models/api/API';
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
                    this.URL + ':' + this.PORT + '/' + ENDPOINTS.SEARCHRESULTS + '/' + query,
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );
                const basicProfiles: BasicProfile[] = new Array<BasicProfile>();
                for (const apiBasicProfile of bp) {
                    const basicProfile: BasicProfile = new BasicProfile(
                        apiBasicProfile._id,
                        apiBasicProfile._name,
                        apiBasicProfile._affiliations,
                        apiBasicProfile._totalCitations,
                        apiBasicProfile._paperCount,
                        apiBasicProfile._pictureUrl,
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
                    this.URL + ':' + this.PORT + '/' + ENDPOINTS.FULLPROFILE + '/' + profileId,
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );
                const basicProfile: BasicProfile = new BasicProfile(
                    fp._basicProfile._id,
                    fp._basicProfile._name,
                    fp._basicProfile._affiliations,
                    fp._basicProfile._totalCitations,
                    fp._basicProfile._paperCount,
                    fp._basicProfile._pictureUrl,
                );
                const articles: Article[] = new Array<Article>();
                for (const art of fp._articles) {
                    articles.push(
                        new Article(
                            art._title,
                            art._venue,
                            art._publicationYear,
                            art._citationCount,
                            art._url,
                            art._articlesCoAuthors.map(
                                (coAuth: APICoAuthor) => new ArticleCoAuthor(coAuth._id, coAuth._name),
                            ),
                            art._abstract,
                        ),
                    );
                }
                const pby: PublicationByYear[] = new Array<PublicationByYear>();
                for (const apiPby of fp._publicationsByYear) {
                    pby.push(new PublicationByYear(apiPby._year, apiPby._publicationsCount));
                }
                const pbv: PublicationByVenue[] = new Array<PublicationByVenue>();
                for (const apiPbv of fp._publicationsByVenue) {
                    pbv.push(new PublicationByVenue(apiPbv._venue, apiPbv._publicationCount));
                }
                const cby: CitationByYear[] = new Array<CitationByYear>();
                for (const apiCby of fp._citationsByYear) {
                    cby.push(
                        new CitationByYear(
                            apiCby._year,
                            apiCby._selfCitationsCount,
                            apiCby._indirectSelfCitationsCount,
                            apiCby._totalCitationCount,
                        ),
                    );
                }
                const citedScholars: CitedScholar[] = new Array<CitedScholar>();
                for (const apiCs of fp._citedScholars) {
                    citedScholars.push(new CitedScholar(apiCs._name, apiCs._citationCount));
                }
                const authors: Author[] = new Array<Author>();
                for (const auth of fp._authors) {
                    console.log(auth._name);
                    authors.push(new Author(auth._name, auth._jointPublicationCount, auth._hIndex));
                }
                const fullProfile: FullProfile = new FullProfile(
                    fp._expertise,
                    fp._hIndex,
                    fp._hIndexWithoutSelfCitations,
                    fp._i10Index,
                    fp._i10IndexWithoutSelfCitations,
                    fp._selfCitationsCount,
                    fp._indirectSelfCitationsCount,
                    fp._totalCitationsCount,
                    fp._url,
                    basicProfile,
                    pby,
                    pbv,
                    cby,
                    citedScholars,
                    authors,
                    articles,
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
