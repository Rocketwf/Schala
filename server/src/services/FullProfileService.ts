import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIAuthor, APICoAuthor, APIPaper } from '../models/API';
import { APIRefCit, PaperId } from '../models/API/API';
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
import { GoogleScholarScraperSource } from '../datasources/GoogleScholarScraperSource';

export class FullProfileService extends ProfileService {
    private _dataSource: DataSource = new SemanticScholarSource();
    private _scraperDataSource: DataSource = new GoogleScholarScraperSource();

    private _fasterCitations: Map<number, CitationsByYear>;

    async build(authorId: string): Promise<FullProfile[]> {
        this._fasterCitations = null;

        const apiAuthor: APIAuthor = await this._dataSource.fetchAuthor(authorId);

        const authorPaperIds: string[] = new Array<string>();
        apiAuthor.papers.forEach((element: PaperId) => {
            authorPaperIds.push(element.paperId);
        });
        const authorPapers: APIPaper[] = await this._dataSource.fetchPapers(authorPaperIds);

        const basicProfile: BasicProfile = this.buildBasicProfile(apiAuthor);

        const googleProfile: APIAuthor = await this._scraperDataSource.fetchAuthor(basicProfile.name);
        basicProfile.pictureUrl = googleProfile.profilePicture;
        basicProfile.affiliations = googleProfile.affiliations;

        const coAuthors: Author[] = this.buildAuthors(apiAuthor, authorPapers);

        const fullProfile: FullProfile = new FullProfile(
            this.buildExpertise(authorPapers),
            this.calculateHIndex(authorPapers),
            this.calculateHIndexWithoutSelfCitations(apiAuthor, authorPapers),
            this.calculateI10Index(authorPapers),
            this.calculateI10IndexWithoutSelfCitations(apiAuthor, authorPapers),
            this.calculateSelfCitations(apiAuthor, authorPapers),
            this.calculateIndirectSelfCitations(apiAuthor, authorPapers),
            basicProfile.totalCitations,
            basicProfile,
            this.buildPublicationsByYear(authorPapers),
            this.buildPublicationsByVenue(authorPapers),
            Array.from(this.prepareFastCitations(apiAuthor, authorPapers).values()),
            this.buildCitedScholars(apiAuthor, authorPapers),
            coAuthors,
            this.buildArticles(apiAuthor, authorPapers),
        );
        return Array.of(fullProfile);
    }

    private buildBasicProfile(apiAuthor: APIAuthor): BasicProfile {
        let name: string = apiAuthor.name;
        if (apiAuthor.aliases) name = apiAuthor.aliases[apiAuthor.aliases.length - 1];
        return new BasicProfile(apiAuthor.authorId, name, apiAuthor.affiliations, apiAuthor.citationCount);
    }

    private buildExpertise(apiPapers: APIPaper[]): string[] {
        const expertise: Set<string> = new Set<string>();
        for (const apiPaper of apiPapers) {
            if (!apiPaper.fieldsOfStudy) continue;
            for (const fieldOfStudy of apiPaper.fieldsOfStudy) {
                expertise.add(fieldOfStudy);
            }
        }
        return Array.from(expertise);
    }

    private calculateHIndex(apiPapers: APIPaper[]): number {
        let hIndex: number = 0;

        apiPapers.sort((a: APIPaper, b: APIPaper) => (a.citationCount > b.citationCount ? -1 : 1));

        apiPapers.forEach((articles: APIPaper, index: number) => {
            if (articles.citationCount >= index) {
                hIndex++;
            }
        });
        return hIndex;
    }

    private isOwnRefOrCit(apiAuthor: APIAuthor, ref: APIRefCit): boolean {
        return ref.authors.filter((author: APICoAuthor) => author.authorId === apiAuthor.authorId).length > 0;
    }
    private getSelfCitationsInPaper(apiAuthor: APIAuthor, paper: APIPaper): number {
        let selfCitationCount: number = 0;
        paper.references.forEach((refOrCit: APIRefCit) => {
            if (this.isOwnRefOrCit(apiAuthor, refOrCit)) {
                ++selfCitationCount;
            }
        });

        return selfCitationCount;
    }
    private calculateHIndexWithoutSelfCitations(apiAuthor: APIAuthor, apiPaper: APIPaper[]): number {
        let hIndexWithoutSelfCitations: number = 0;
        apiPaper.forEach((article: APIPaper, index: number) => {
            if (article.citationCount - this.getSelfCitationsInPaper(apiAuthor, article) >= index) {
                hIndexWithoutSelfCitations++;
            }
        });
        return hIndexWithoutSelfCitations;
    }

    private calculateI10Index(apiPapers: APIPaper[]): number {
        let i10Index: number = 0;
        for (const paper of apiPapers) {
            if (paper.citationCount >= 10) {
                i10Index++;
            }
        }
        return i10Index;
    }

    private calculateI10IndexWithoutSelfCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): number {
        let i10IndexWithoutSelfCitations: number = 0;
        for (const article of apiPapers) {
            if (article.citationCount - this.getSelfCitationsInPaper(apiAuthor, article) >= 10) {
                i10IndexWithoutSelfCitations++;
            }
        }
        return i10IndexWithoutSelfCitations;
    }

    private calculateSelfCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): number {
        if (!this._fasterCitations) this._fasterCitations = this.prepareFastCitations(apiAuthor, apiPapers);
        return Array.from(this._fasterCitations.values())
            .map((e: CitationsByYear) => e.selfCitationsCount)
            .reduce((acc: number, curr: number) => acc + curr);
    }

    public prepareFastCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): Map<number, CitationsByYear> {
        if (this._fasterCitations) {
            return this._fasterCitations;
        }
        const fasterCitations: Map<number, CitationsByYear> = new Map<number, CitationsByYear>();
        for (const article of apiPapers) {
            let citations: CitationsByYear = fasterCitations.get(article.year);

            if (!citations) {
                citations = new CitationsByYear(+article.year, 0, 0, 0);
                fasterCitations.set(article.year, citations);
            }

            for (const citation of article.citations) {
                let totalCite: CitationsByYear = fasterCitations.get(citation.year);
                if (!totalCite) {
                    totalCite = new CitationsByYear(+citation.year, 0, 0, 0);
                    fasterCitations.set(citation.year, totalCite);
                }
                totalCite.totalCitationCount++;
                if (this.isOwnRefOrCit(apiAuthor, citation)) continue;
                for (const author of citation.authors) {
                    if (article.authors.find((e: APIAuthor) => e.authorId === author.authorId)) {
                        let indSelfCite: CitationsByYear = fasterCitations.get(citation.year);
                        if (!indSelfCite) {
                            indSelfCite = new CitationsByYear(+article.year, 0, 0, 0);
                            fasterCitations.set(citation.year, indSelfCite);
                        }
                        indSelfCite.indirectSelfCitationsCount++;
                        break;
                    }
                }
            }

            citations.selfCitationsCount += this.getSelfCitationsInPaper(apiAuthor, article);
        }
        this._fasterCitations = fasterCitations;
        return this._fasterCitations;
    }
    private calculateIndirectSelfCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): number {
        if (!this._fasterCitations) this._fasterCitations = this.prepareFastCitations(apiAuthor, apiPapers);
        return Array.from(this.prepareFastCitations(apiAuthor, apiPapers).values())
            .map((e: CitationsByYear) => e.indirectSelfCitationsCount)
            .reduce((acc: number, curr: number) => acc + curr);
    }

    private buildPublicationsByYear(apiPapers: APIPaper[]): PublicationByYear[] {
        const publicationsByYear: PublicationByYear[] = new Array<PublicationByYear>();
        const publicationMap: Map<number, number> = new Map<number, number>(); //Pairs of years and publication counts
        for (const paper of apiPapers) {
            if (publicationMap.has(paper.year)) {
                publicationMap.set(paper.year, publicationMap.get(paper.year) + 1);
            } else {
                publicationMap.set(paper.year, 1);
            }
        }
        for (const [year, pubCount] of publicationMap) {
            if (!year) continue;
            publicationsByYear.push(new PublicationByYear(year, pubCount));
        }
        publicationsByYear.sort((a: PublicationByYear, b: PublicationByYear) => (a.year < b.year ? -1 : 1));
        return publicationsByYear;
    }

    private buildPublicationsByVenue(apiPapers: APIPaper[]): PublicationByVenue[] {
        const publicationsByVenue: PublicationByVenue[] = new Array<PublicationByVenue>();
        const publicationMap: Map<string, number> = new Map<string, number>(); //Pairs of venues and publication counts
        for (const paper of apiPapers) {
            if (publicationMap.has(paper.venue)) {
                publicationMap.set(paper.venue, publicationMap.get(paper.venue) + 1);
            } else {
                publicationMap.set(paper.venue, 1);
            }
        }
        publicationMap.forEach((value_count: number, key_year: string) => {
            publicationsByVenue.push(new PublicationByVenue(key_year, value_count));
        });
        publicationsByVenue.sort((a: PublicationByVenue, b: PublicationByVenue) =>
            a.publicationCount > b.publicationCount ? -1 : 1,
        );
        return publicationsByVenue;
    }

    private buildCitedScholars(apiAuthor: APIAuthor, apiPapers: APIPaper[]): CitedScholar[] {
        const citedScholars: CitedScholar[] = new Array<CitedScholar>();
        const citationsMap: Map<string, number> = new Map<string, number>();

        for (const paper of apiPapers) {
            for (const ref of paper.references) {
                for (const coauthors of ref.authors) {
                    if (coauthors.authorId === apiAuthor.authorId) {
                        continue;
                    }
                    if (citationsMap.has(coauthors.name)) {
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

    private buildAuthors(apiAuthor: APIAuthor, apiPapers: APIPaper[]): Author[] {
        const authors: Map<string, Author> = new Map<string, Author>();
        for (const paper of apiPapers) {
            for (const author of paper.authors) {
                if (author.authorId === apiAuthor.authorId) continue;
                if (!authors.has(author.authorId)) {
                    let name: string = author.name;
                    if (author.aliases) {
                        name = author.aliases[author.aliases.length - 1];
                    }
                    authors.set(author.authorId, new Author(author.authorId, name, 1, author.hIndex));
                    continue;
                }
                authors.get(author.authorId).jointPublicationCount += 1;
            }
        }
        return Array.from(authors.values());
    }

    private buildArticles(apiAuthor: APIAuthor, apiPapers: APIPaper[]): Article[] {
        const articles: Article[] = new Array<Article>();
        for (const paper of apiPapers) {
            const articleToPush: Article = new Article();
            articleToPush.title = paper.title;
            articleToPush.publicationYear = paper.year;
            articleToPush.venue = paper.venue;
            articleToPush.selfCitationsCount = this.getSelfCitationsInPaper(apiAuthor, paper);
            articleToPush.citationCount = paper.citationCount;
            articleToPush.abstract = paper.abstract;
            const paperCoauthors: ArticleCoAuthor[] = new Array<ArticleCoAuthor>();
            for (const author of paper.authors) {
                if (author.authorId === apiAuthor.authorId) {
                    continue;
                }
                paperCoauthors.push(new ArticleCoAuthor(author.authorId, author.name));
            }
            articles.push(articleToPush);
        }
        return articles;
    }
}
