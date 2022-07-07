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

export class FullProfileService extends ProfileService {
    private dataSource: DataSource = new SemanticScholarSource();

    private apiAuthor: APIAuthor;
    private authorPapers: APIPaper[];

    private coAuthors: Author[];

    private _fasterCitations: Map<number, CitationsByYear>;

    async build(authorId: string): Promise<FullProfile[]> {
        this.apiAuthor = await this.dataSource.fetchAuthor(authorId);
        const authorPaperIds: string[] = new Array<string>();
        this.apiAuthor.papers.data.forEach((element: PaperId) => {
            authorPaperIds.push(element.paperId);
        });
        this.authorPapers = await this.dataSource.fetchPapers(authorPaperIds);

        const basicProfile: BasicProfile = this.buildBasicProfile();

        this.coAuthors = this.buildAuthors();

        const fullProfile: FullProfile = new FullProfile(
            this.buildExpertise(),
            this.calculateHIndex(),
            this.calculateHIndexWithoutSelfCitations(),
            this.calculateI10Index(),
            this.calculateI10IndexWithoutSelfCitations(),
            this.calculateSelfCitations(),
            this.calculateIndirectSelfCitations(),
            basicProfile.totalCitations,
            basicProfile,
            this.buildPublicationsByYear(),
            this.buildPublicationsByVenue(),
            Array.from(this.citations.values()),
            this.buildCitedScholars(),
            this.coAuthors,
            this.buildArticles(),
        );
        return Array.of(fullProfile);
    }

    private buildBasicProfile(): BasicProfile {
        return new BasicProfile(
            this.apiAuthor.authorId,
            this.apiAuthor.name,
            this.apiAuthor.affiliations,
            this.apiAuthor.citationCount,
        );
    }

    private buildExpertise(): string[] {
        const expertise: Set<string> = new Set<string>();
        for (const apiPaper of this.authorPapers) {
            for (const fieldOfStudy of apiPaper.fieldsOfStudy) {
                expertise.add(fieldOfStudy);
            }
        }
        return Array.from(expertise);
    }

    private calculateHIndex(): number {
        if (this.apiAuthor.hIndex != null) {
            return this.apiAuthor.hIndex;
        } else {
            let hIndex: number = 0;

            this.authorPapers.sort((a: APIPaper, b: APIPaper) => (a.citationCount > b.citationCount ? -1 : 1));

            this.authorPapers.forEach((articles: APIPaper, index: number) => {
                if (articles.citationCount >= index) {
                    hIndex++;
                }
            });
            return hIndex;
        }
    }

    private isOwnRefOrCit(ref: APIRefCit): boolean {
        return ref.authors.filter((author: APICoAuthor) => author.authorId === this.apiAuthor.authorId).length > 0;
    }
    private getSelfCitationsInPaper(paper: APIPaper): number {
        let selfCitationCount: number = 0;
        paper.references.forEach((refOrCit: APIRefCit) => {
            if (this.isOwnRefOrCit(refOrCit)) {
                ++selfCitationCount;
            }
        });

        return selfCitationCount;
    }
    private calculateHIndexWithoutSelfCitations(): number {
        let hIndexWithoutSelfCitations: number = 0;
        this.authorPapers.forEach((article: APIPaper, index: number) => {
            if (article.citationCount - this.getSelfCitationsInPaper(article) >= index) {
                hIndexWithoutSelfCitations++;
            }
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
            if (article.citationCount - this.getSelfCitationsInPaper(article) >= 10) {
                i10IndexWithoutSelfCitations++;
            }
        }
        return i10IndexWithoutSelfCitations;
    }

    private calculateSelfCitations(): number {
        if (!this._fasterCitations) this._fasterCitations = this.citations;
        return Array.from(this.citations.values())
            .map((e: CitationsByYear) => e.selfCitationsCount)
            .reduce((acc: number, curr: number) => acc + curr);
    }

    public get citations(): Map<number, CitationsByYear> {
        if (this._fasterCitations) {
            return this._fasterCitations;
        }
        const fasterCitations: Map<number, CitationsByYear> = new Map<number, CitationsByYear>();
        for (const article of this.authorPapers) {
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
                if (this.isOwnRefOrCit(citation)) continue;
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

            citations.selfCitationsCount += this.getSelfCitationsInPaper(article);
        }
        this._fasterCitations = fasterCitations;
        return this._fasterCitations;
    }
    private calculateIndirectSelfCitations(): number {
        if (!this._fasterCitations) this._fasterCitations = this.citations;
        return Array.from(this.citations.values())
            .map((e: CitationsByYear) => e.indirectSelfCitationsCount)
            .reduce((acc: number, curr: number) => acc + curr);
    }

    private buildPublicationsByYear(): PublicationByYear[] {
        const publicationsByYear: PublicationByYear[] = new Array<PublicationByYear>();
        const publicationMap: Map<number, number> = new Map<number, number>(); //Pairs of years and publication counts
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
        const publicationMap: Map<string, number> = new Map<string, number>(); //Pairs of venues and publication counts
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
        publicationsByVenue.sort((a: PublicationByVenue, b: PublicationByVenue) =>
            a.publicationCount > b.publicationCount ? -1 : 1,
        );
        return publicationsByVenue;
    }

    private buildCitedScholars(): CitedScholar[] {
        const citedScholars: CitedScholar[] = new Array<CitedScholar>();
        const citationsMap: Map<string, number> = new Map<string, number>();

        for (const paper of this.authorPapers) {
            for (const citing of paper.citations) {
                for (const coauthors of citing.authors) {
                    if ((coauthors.authorId = this.apiAuthor.authorId)) {
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

    private buildAuthors(): Author[] {
        const authors: Map<string, Author> = new Map<string, Author>();
        for (const paper of this.authorPapers) {
            for (const author of paper.authors) {
                if (author.authorId === this.apiAuthor.authorId) continue;
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

    private buildArticles(): Article[] {
        const articles: Article[] = new Array<Article>();
        for (const paper of this.authorPapers) {
            const articleToPush: Article = new Article();
            articleToPush.title = paper.title;
            articleToPush.publicationYear = paper.year;
            articleToPush.venue = paper.venue;
            articleToPush.selfCitationsCount = 0; //TODO:????
            articleToPush.citationCount = paper.citationCount;
            articleToPush.abstract = paper.abstract;
            const paperCoauthors: ArticleCoAuthor[] = new Array<ArticleCoAuthor>();
            for (const author of paper.authors) {
                if (author.authorId == this.apiAuthor.authorId) {
                    continue;
                }
                paperCoauthors.push(new ArticleCoAuthor(author.authorId, author.name));
            }
            articles.push(articleToPush);
        }
        return articles;
    }
}
