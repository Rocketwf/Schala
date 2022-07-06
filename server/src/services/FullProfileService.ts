import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIAuthor, APIBasicAuthor, APIPaper } from '../models/API';
import { PaperId } from '../models/API/API';
import { Article } from '../models/profile/Article';
import { Author } from '../models/profile/Author';
import { BasicProfile } from '../models/profile/BasicProfile';
import { CitedScholar } from '../models/profile/CitedScholar';
import { FullProfile } from '../models/profile/FullProfile';
import { PublicationByYear } from '../models/profile/PublicationByYear';
import { PublicationByVenue } from '../models/profile/PublicationByVenue';
import { ProfileService } from './ProfileService';
import { CitationsByYear } from '../models/profile/CitationsByYear';
import { ArticleCoAuthor } from '../models/profile/ArticleCoAuthor';

export class FullProfileService extends ProfileService {
    private dataSource: DataSource = SemanticScholarSource.getInstance();

    private authorId: string; //The current scholar being added
    private apiAuthor: APIAuthor;
    private authorPapers: APIPaper[];
    private pictureURL: string;

    async build(query: string): Promise<FullProfile[]> {
        this.apiAuthor = await this.dataSource.fetchAuthor(query);
        this.authorId = this.apiAuthor.authorId;
        const authorPaperIds: string[] = new Array<string>();
        this.apiAuthor.papers.data.forEach((element: PaperId) => {
            authorPaperIds.push(element.paperId);
        });
        this.authorPapers = await this.dataSource.fetchPapers(authorPaperIds);
        this.pictureURL = await this.dataSource.fetchPictureURL(this.authorId);

        const fullProfile: FullProfile = new FullProfile;
        fullProfile.basicProfile = this.buildBasicProfile();
        fullProfile.expertises = this.buildExpertise();
        fullProfile.hIndex = this.calculateHIndex();
        fullProfile.hIndexWithoutSelfCitations = this.calculateHIndexWithoutSelfCitations();
        fullProfile.i10Index = this.calculateI10Index();
        fullProfile.i10IndexWithoutSelfCitations = this.calculateI10IndexWithoutSelfCitations();
        fullProfile.selfCitationsCount = this.calculateSelfCitations();
        fullProfile.indirectSelfCitationsCount = this.calculateIndirectSelfCitations();
        fullProfile.publicationsByYear = this.buildPublicationsByYear();
        fullProfile.publicationsByVenue = this.buildPublicationsByVenue();
        fullProfile.citationsByYear = this.buildCitationsByYear();
        fullProfile.citedScholars = this.buildCitedScholars();
        fullProfile.authors = this.buildAuthors();
        fullProfile.articles = this.buildArticles();
        return Array.of(fullProfile);
    }

    private buildBasicProfile(): BasicProfile {
        return new BasicProfile(
            this.authorId,
            this.apiAuthor.name, 
            this.apiAuthor.affiliations, 
            this.apiAuthor.citationCount,
            this.pictureURL
            );
    }

    private buildExpertise(): string[] {
        //TODO:????
    }

    private calculateHIndex(): number {
        if (this.apiAuthor.hIndex != null) {
            return this.apiAuthor.hIndex;
        } else {
            let hIndex: number = 0;

            this.authorPapers.sort((a: APIPaper, b: APIPaper) => (a.citationCount > b.citationCount ? -1 : 1));

            this.authorPapers.forEach((articles: APIPaper, index: number) => {
                if (articles.citationCount < index) {
                    return;
                }
                hIndex++;
            });
            return hIndex;
        }
    }

    private calculateHIndexWithoutSelfCitations(): number {
        let hIndexWithoutSelfCitations: number = 0;
        this.authorPapers.forEach((article: APIPaper, index: number) => {
            if (article.citationCount - article.selfCitation < index) {
                return;
            }
            hIndexWithoutSelfCitations++;
        });
        return hIndexWithoutSelfCitations;
    }

    private calculateI10Index(): number {
        let i10Index: number = 0;
        for (const paper of this.authorPapers) {
            if (paper.citationCount >= 10) {
                i10Index++;
            }
        }
        return i10Index;
    }

    private calculateI10IndexWithoutSelfCitations(): number {
        let i10IndexWithoutSelfCitations: number = 0;
        for (const article of this.authorPapers) {
            if (article.citationCount - article.selfCitation >= 10) {
                i10IndexWithoutSelfCitations++;
            }
        }
        return i10IndexWithoutSelfCitations;
    }

    private calculateSelfCitations(): number {
        //TODO:????
    }

    private calculateIndirectSelfCitations(): number {
        //TODO:????
    }

    private buildPublicationsByYear(): PublicationByYear[] {
        const publicationsByYear: PublicationByYear[] = new Array<PublicationByYear>();
        const publicationMap: Map<number, number> = new Map<number, number>; //Pairs of years and publication counts
        for (const paper of this.authorPapers) {
            if (publicationMap.has(paper.year)) {
                publicationMap.set(paper.year, publicationMap.get(paper.year) + 1);
            } else {
                publicationMap.set(paper.year, 1);
            }
        }
        publicationMap.forEach((value_count: number, key_year: number) => {
            publicationsByYear.push(new PublicationByYear(key_year, value_count));
        });
        publicationsByYear.sort((a: PublicationByYear, b: PublicationByYear) => (a.year < b.year ? -1 : 1));
        return publicationsByYear;
    }

    private buildPublicationsByVenue(): PublicationByVenue[] {
        const publicationsByVenue: PublicationByVenue[] = new Array<PublicationByVenue>();
        const publicationMap: Map<string, number> = new Map<string, number>; //Pairs of venues and publication counts
        for (const paper of this.authorPapers) {
            if (publicationMap.has(paper.venue)) {
                publicationMap.set(paper.venue, publicationMap.get(paper.venue) + 1);
            } else {
                publicationMap.set(paper.venue, 1);
            }
        }
        publicationMap.forEach((value_count: number, key_year: string) => {
            publicationsByVenue.push(new PublicationByVenue(key_year, value_count));
        });
        publicationsByVenue.sort((a: PublicationByVenue, b: PublicationByVenue) => (a.publicationCount > b.publicationCount ? -1 : 1));
        return publicationsByVenue;
    }

    private buildCitationsByYear(): CitationsByYear[] {
        const citationsByYear: CitationsByYear[] = new Array<CitationsByYear>();
        const citationsMap: Map<number, number> = new Map<number, number>;

        for (const paper of this.authorPapers) {
            for (const citing of paper.citations) {
                if (citationsMap.has(citing.year)) {
                    citationsMap.set(citing.year, citationsMap.get(citing.year) + 1);
                } else {
                    citationsMap.set(citing.year, 1);
                }
            }
        }

        citationsMap.forEach((value_count: number, key_year: number) => {
            citationsByYear.push(new CitationsByYear(key_year, ??, ??, value_count));
        });

        return citationsByYear;
    }

    private buildCitedScholars(): CitedScholar[] {
        const citedScholars: CitedScholar[] = new Array<CitedScholar>();
        const citationsMap: Map<string, number> = new Map<string, number>();

        for (const paper of this.authorPapers) {
            for (const citing of paper.citations) {
                for (const coauthors of citing.authors) {
                    if(coauthors.authorId = this.authorId) {
                        continue;
                    }
                    if(citationsMap.has(coauthors.name)) {
                        citationsMap.set(coauthors.name, citationsMap.get(coauthors.name) + 1);
                    } else {
                        citationsMap.set(coauthors.name, 1);
                    }
                }
            }
        }

        citationsMap.forEach((value_count: number, key_author: string) => {
            citedScholars.push(new CitedScholar(key_author, value_count));
        });

        citedScholars.sort((a: CitedScholar, b: CitedScholar) => (a.citationCount > b.citationCount ? -1 : 1));

        return citedScholars;
    }

    private buildAuthors(): Author[] {
        //TODO:????
    }

    private buildArticles(): Article[] {
        let articles: Article[] = new Array<Article>();
        for(const paper of this.authorPapers) {
            let articleToPush = new Article();
            articleToPush.title = paper.title;
            articleToPush.publicationYear = paper.year;
            articleToPush.venue = paper.venue;
            articleToPush.selfCitationsCount = 0 //TODO:????
            articleToPush.citationCount = paper.citationCount;
            articleToPush.abstract = paper.abstract;
            const paperCoauthors: ArticleCoAuthor[] = new Array<ArticleCoAuthor>();
            for(const author of paper.authors) {
                if(author.authorId == this.authorId) {
                    continue;
                }
                paperCoauthors.push(new ArticleCoAuthor(author.authorId, author.name));
            }
            articles.push(articleToPush);
        }
        return articles;
    }
}
