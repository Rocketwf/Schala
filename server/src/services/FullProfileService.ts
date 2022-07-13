import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIAuthor, APICoAuthor, APIPaper } from '../models/API';
import { APIRefCit } from '../models/API/API';
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

/**
 * Class responsible for requesting the data source for information about a particular
 * scholar and building the data structures related to the respresenation of the scholar.
 */
export class FullProfileService extends ProfileService 
{
    /**
     * The primary data source for fetching information about a scholar
     */
    private _dataSource: DataSource = new SemanticScholarSource();
    /**
     * The secondary data source for fetching information about a scholar
     * if the first data source is not sufficient or does not deliver
     * the fields needed for building a full profile
     */
    private _scraperDataSource: DataSource = new GoogleScholarScraperSource();

    private _fasterCitations: Map<number, CitationsByYear>;

    /**
     * Method responsible for assembling the information of a scholar building the final data
     * structure containing every relevant information of a scholar
     * @param authorId - The author with the ID to build
     * @returns A promise of an array of the FullProfiles
     */
    async build(authorId: string): Promise<FullProfile[]> 
    {
        this._fasterCitations = null;

        const apiAuthor: APIAuthor = await this._dataSource.fetchAuthor(authorId);

        const authorPaperIds: string[] = new Array<string>();

        for (const paper of apiAuthor.papers) 
        {
            authorPaperIds.push(paper.paperId);
        }

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
            googleProfile.url,

            basicProfile,
            this.buildPublicationsByYear(authorPapers),
            this.buildPublicationsByVenue(authorPapers),
            Array.from(this.prepareFastCitations(apiAuthor, authorPapers).values()).sort(this.sortCitationByYear),
            this.buildCitedScholars(apiAuthor, authorPapers),
            coAuthors,
            this.buildArticles(apiAuthor, authorPapers),
        );
        return Array.of(fullProfile);
    }

    /**
     * Compares the two given values and is used for sorting CitationsByYear in descending order
     * @param c1 - First number to be compared
     * @param c2 - Second number to be compared
     * @returns -1 or 1 whether the first parameter is bigger than the second parameter or not respectively
     */
    private sortCitationByYear(c1: CitationsByYear, c2: CitationsByYear): number 
    {
        if (c1.year > c2.year) 
        {
            return -1;
        }
        else 
        {
            return 1;
        }
    }

    /**
     * Builds a BasicProfile object for the given apiAuthor
     * @param apiAuthor - apiAuthor object of the author to build
     * @returns BasicProfile object of the scholar with the basic information
     */
    private buildBasicProfile(apiAuthor: APIAuthor): BasicProfile 
    {
        let name: string = apiAuthor.name;
        if (apiAuthor.aliases) name = apiAuthor.aliases[apiAuthor.aliases.length - 1];
        const basicProfile: BasicProfile = new BasicProfile(
            apiAuthor.authorId,
            name,
            apiAuthor.affiliations,
            apiAuthor.citationCount,
        );
        return basicProfile;
    }

    /**
     * Builds the expertises list of the papers being passed
     * @param apiPapers - apiPapers object array of the papers to build
     * @returns Array of the expertises from the papers 
     */
    private buildExpertise(apiPapers: APIPaper[]): string[] 
    {
        const expertise: Set<string> = new Set<string>();
        for (const apiPaper of apiPapers) 
        {
            if (!apiPaper.fieldsOfStudy) continue;
            for (const fieldOfStudy of apiPaper.fieldsOfStudy) 
            {
                expertise.add(fieldOfStudy);
            }
        }
        const sortedExpertise: string[] = Array.from(expertise).sort();
        return sortedExpertise;
    }

    /**
     * Calculates hindex from the list papers being passed
     * @param apiPapers - apiPapers object array of the papers to build
     * @returns hindex from the papers
     */
    private calculateHIndex(apiPapers: APIPaper[]): number 
    {
        let hIndex: number = 0;

        apiPapers.sort(this.sortAPIPaper);

        apiPapers.forEach((articles: APIPaper, index: number) => 
        {
            if (articles.citationCount >= index) 
            {
                hIndex++;
            }
        });
        return hIndex;
    }

    /**
     * Compares the two given APIPaper objects and is used for sorting the 
     * number of citations for a paper in descending order
     * @param a - First number to be compared
     * @param b - Second number to be compared
     * @returns -1 or 1 whether the first parameters citationsCount
     * is bigger than the second parameters or not respectively
     */
    private sortAPIPaper(a: APIPaper, b: APIPaper): number 
    {
        if (a.citationCount > b.citationCount) 
        {
            return -1;
        }
        else 
        {
            return 1;
        }
    }

    /**
     * Determines whether the passed APIAuthor has is a self reference
     * or a self citation or not.
     * @param apiAuthor - APIAuthor author to check
     * @param ref - The object of references or citations to check against
     * @returns true if it is a self citation
     */
    private isOwnRefOrCit(apiAuthor: APIAuthor, ref: APIRefCit): boolean 
    {
        const toReturn: APICoAuthor[] = [];
        for (const author of ref.authors) 
        {
            if (author.authorId === apiAuthor.authorId) 
            {
                toReturn.push(author);
            }
        }
        return toReturn.length > 0;
    }

    /**
     * Calculates the number of self citations of a paper
     * @param apiAuthor - APIAuthor author to check
     * @param paper - The APIPaper paper to check against
     * @returns Number of self citations for the paper
     */
    private getSelfCitationsInPaper(apiAuthor: APIAuthor, paper: APIPaper): number 
    {
        let selfCitationCount: number = 0;
        paper.references.forEach((refOrCit: APIRefCit) => 
        {
            if (this.isOwnRefOrCit(apiAuthor, refOrCit)) 
            {
                ++selfCitationCount;
            }
        });

        return selfCitationCount;
    }
    /**
     * Calculates hindex without self citations for an author with the given papers
     * @param apiAuthor - APIAuthor author to check
     * @param apiPaper - The APIPaper papers to check against
     * @returns hindex without self citations 
     */
    private calculateHIndexWithoutSelfCitations(apiAuthor: APIAuthor, apiPaper: APIPaper[]): number 
    {
        let hIndexWithoutSelfCitations: number = 0;
        apiPaper.forEach((article: APIPaper, index: number) => 
        {
            if (article.citationCount - this.getSelfCitationsInPaper(apiAuthor, article) >= index) 
            {
                hIndexWithoutSelfCitations++;
            }
        });
        return hIndexWithoutSelfCitations;
    }

    /**
     * Calculates i10 index for the given papers
     * @param apiPapers - The APIPaper papers to check against
     * @returns The i10 index for the papers
     */
    private calculateI10Index(apiPapers: APIPaper[]): number 
    {
        let i10Index: number = 0;
        for (const paper of apiPapers) 
        {
            if (paper.citationCount >= 10) 
            {
                i10Index++;
            }
        }
        return i10Index;
    }

    /**
     * Calculates i10 index without self citations for the given author and papers
     * @param apiPapers - The APIPaper papers to check against
     * @returns The i10 index for the papers
     */
    private calculateI10IndexWithoutSelfCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): number 
    {
        let i10IndexWithoutSelfCitations: number = 0;
        for (const article of apiPapers) 
        {
            if (article.citationCount - this.getSelfCitationsInPaper(apiAuthor, article) >= 10) 
            {
                i10IndexWithoutSelfCitations++;
            }
        }
        return i10IndexWithoutSelfCitations;
    }

    /**
     * Calculates self citations
     * @param apiAuthor - APIAuthor author to check
     * @param apiPapers - The APIPaper papers to check against
     * @returns Number of self citations
     */
    private calculateSelfCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): number 
    {
        if (!this._fasterCitations) 
        {
            this._fasterCitations = this.prepareFastCitations(apiAuthor, apiPapers);
        }

        const citationsByYear: CitationsByYear[] = Array.from(this.prepareFastCitations(apiAuthor, apiPapers).values());
        const selfCitations: number[] = [];
        for (const cby of citationsByYear) 
        {
            const count: number = cby.selfCitationsCount;
            selfCitations.push(count);
        }

        let sum: number = 0;
        for (const sc of selfCitations) 
        {
            sum += sc;
        }

        return sum;
    }

    /**
     * Prepares fast citations
     * @param apiAuthor - APIAuthor author to check
     * @param apiPapers - The APIPaper papers to check against
     * @returns A mapping from count to CitationsByYear
     */
    public prepareFastCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): Map<number, CitationsByYear> 
    {
        if (this._fasterCitations) 
        {
            return this._fasterCitations;
        }
        const fasterCitations: Map<number, CitationsByYear> = new Map<number, CitationsByYear>();
        for (const article of apiPapers) 
        {
            let citations: CitationsByYear = fasterCitations.get(article.year);

            if (!citations) 
            {
                citations = new CitationsByYear(+article.year, 0, 0, 0);
                fasterCitations.set(article.year, citations);
            }

            for (const citation of article.citations) 
            {
                let totalCite: CitationsByYear = fasterCitations.get(citation.year);
                if (!totalCite) 
                {
                    totalCite = new CitationsByYear(+citation.year, 0, 0, 0);
                    fasterCitations.set(citation.year, totalCite);
                }
                totalCite.totalCitationCount++;
                if (this.isOwnRefOrCit(apiAuthor, citation)) 
                {
                    continue;
                }
                for (const author of citation.authors) 
                {
                    if (article.authors.find((e: APIAuthor) => e.authorId === author.authorId)) 
                    {
                        let indSelfCite: CitationsByYear = fasterCitations.get(citation.year);
                        if (!indSelfCite) 
                        {
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

    /**
     * Calculates number indirect self citations
     * @param apiAuthor - APIAuthor author to check
     * @param apiPapers - The APIPaper papers to check against
     * @returns Number of indirect self citations 
     */
    private calculateIndirectSelfCitations(apiAuthor: APIAuthor, apiPapers: APIPaper[]): number 
    {
        if (!this._fasterCitations) 
        {
            this._fasterCitations = this.prepareFastCitations(apiAuthor, apiPapers);
        }

        const citationsByYear: CitationsByYear[] = Array.from(this.prepareFastCitations(apiAuthor, apiPapers).values());
        const indirectSelfCitations: number[] = [];
        for (const cby of citationsByYear) 
        {
            const count: number = cby.indirectSelfCitationsCount;
            indirectSelfCitations.push(count);
        }

        let sum: number = 0;
        for (const isc of indirectSelfCitations) 
        {
            sum += isc;
        }

        return sum;
    }

    /**
     * Builds the data for the publications by year
     * @param apiPapers - The APIPapers to check
     * @returns Data for the publications by year 
     */
    private buildPublicationsByYear(apiPapers: APIPaper[]): PublicationByYear[] 
    {
        const publicationsByYear: PublicationByYear[] = new Array<PublicationByYear>();
        const publicationMap: Map<number, number> = new Map<number, number>(); //Pairs of years and publication counts
        for (const paper of apiPapers) 
        {
            if (publicationMap.has(paper.year)) 
            {
                publicationMap.set(paper.year, publicationMap.get(paper.year) + 1);
            }
            else 
            {
                publicationMap.set(paper.year, 1);
            }
        }
        for (const [year, pubCount] of publicationMap) 
        {
            if (!year) 
            {
                continue;
            }
            publicationsByYear.push(new PublicationByYear(year, pubCount));
        }
        publicationsByYear.sort(this.sortPublicationByYear);
        return publicationsByYear;
    }

    /**
     * Compares the two given PublicationByYear objects and is used for sorting the 
     * years for a paper in ascending order
     * @param a - First PublicationByYear to be compared
     * @param b - Second PublicationByYear to be compared
     * @returns -1 or 1 whether the first parameters year
     * is bigger than the second parameters or not respectively
     */
    private sortPublicationByYear(a: PublicationByYear, b: PublicationByYear): number 
    {
        if (a.year < b.year) 
        {
            return -1;
        }
        else 
        {
            return 1;
        }
    }

    /**
     * Builds the data for the publications by venue
     * @param apiPapers - The APIPaper papers to check
     * @returns Data for the publications by venue 
     */
    private buildPublicationsByVenue(apiPapers: APIPaper[]): PublicationByVenue[] 
    {
        const publicationsByVenue: PublicationByVenue[] = new Array<PublicationByVenue>();
        const publicationMap: Map<string, number> = new Map<string, number>(); //Pairs of venues and publication counts
        for (const paper of apiPapers) 
        {
            if (publicationMap.has(paper.venue)) 
            {
                publicationMap.set(paper.venue, publicationMap.get(paper.venue) + 1);
            }
            else 
            {
                publicationMap.set(paper.venue, 1);
            }
        }
        publicationMap.forEach((value_count: number, key_year: string) => 
        {
            publicationsByVenue.push(new PublicationByVenue(key_year, value_count));
        });
        publicationsByVenue.sort(this.sortPublicationByVenue);
        return publicationsByVenue;
    }

    /**
     * Compares the two given PublicationByVenue objects and is used for sorting the 
     * publication counts for a paper in ascending order
     * @param a - First PublicationByVenue to be compared
     * @param b - Second PublicationByVenue to be compared
     * @returns -1 or 1 whether the first parameters publication count
     * is bigger than the second parameters or not respectively
     */
    private sortPublicationByVenue(a: PublicationByVenue, b: PublicationByVenue): number 
    {
        if (a.publicationCount > b.publicationCount) 
        {
            return -1;
        }
        else 
        {
            return 1;
        }
    }

    /**
     * Builds he data for the cited scholars
     * @param apiAuthor - The current author being built
     * @param apiPapers - The papers of the author
     * @returns Data for the cited scholars 
     */
    private buildCitedScholars(apiAuthor: APIAuthor, apiPapers: APIPaper[]): CitedScholar[] 
    {
        const citedScholars: CitedScholar[] = new Array<CitedScholar>();
        const citationsMap: Map<string, number> = new Map<string, number>();

        for (const paper of apiPapers) 
        {
            for (const ref of paper.references) 
            {
                for (const coauthors of ref.authors) 
                {
                    if (coauthors.authorId === apiAuthor.authorId) 
                    {
                        continue;
                    }
                    if (citationsMap.has(coauthors.name)) 
                    {
                        citationsMap.set(coauthors.name, citationsMap.get(coauthors.name) + 1);
                    }
                    else 
                    {
                        citationsMap.set(coauthors.name, 1);
                    }
                }
            }
        }

        citationsMap.forEach((value_count: number, key_author: string) => 
        {
            citedScholars.push(new CitedScholar(key_author, value_count));
        });

        citedScholars.sort(this.sortCitedScholars);

        return citedScholars;
    }

    /**
     * Compares the two given CitedScholar objects and is used for sorting the 
     * citation count for a scholar in descending order
     * @param a - First CitedScholar to be compared
     * @param b - Second CitedScholar to be compared
     * @returns -1 or 1 whether the first parameters year
     * is bigger than the second parameters or not respectively
     */
    private sortCitedScholars(a: CitedScholar, b: CitedScholar): number 
    {
        if (a.citationCount > b.citationCount) 
        {
            return -1;
        }
        else 
        {
            return 1;
        }
    }

    /**
     * Builds the data for the authors
     * @param apiAuthor - The author to build
     * @param apiPapers - The papers of the author
     * @returns The data of the Authors
     */
    private buildAuthors(apiAuthor: APIAuthor, apiPapers: APIPaper[]): Author[] 
    {
        const authors: Map<string, Author> = new Map<string, Author>();
        for (const paper of apiPapers) 
        {
            for (const author of paper.authors) 
            {
                if (author.authorId === apiAuthor.authorId) 
                {
                    continue;
                }
                if (!authors.has(author.authorId)) 
                {
                    let name: string = author.name;
                    if (author.aliases) 
                    {
                        name = author.aliases[author.aliases.length - 1];
                    }
                    authors.set(author.authorId, new Author(author.authorId, name, 1, author.hIndex));
                    continue;
                }
                authors.get(author.authorId).jointPublicationCount += 1;
            }
        }
        const authorsArray: Author[] = Array.from(authors.values()).sort(this.sortAuthors);
        return authorsArray;
    }

    /**
     * Compares the two given Author objects and is used for sorting the 
     * h-index for a scholar in descending order
     * @param a1 - First Author to be compared
     * @param b1 - Second Author to be compared
     * @returns -1 or 1 whether the first parameters h-index
     * is bigger than the second parameters or not respectively
     */
    private sortAuthors(a1: Author, a2: Author): number 
    {
        if (a1.hIndex > a2.hIndex) 
        {
            return -1;
        }
        else 
        {
            return 1;
        }
    }

    /**
     * Builds the articles of a scholar
     * @param apiAuthor - The scholar to be built
     * @param apiPapers - The papers of the scholar
     * @returns The data of the articles
     */
    private buildArticles(apiAuthor: APIAuthor, apiPapers: APIPaper[]): Article[] 
    {
        const articles: Article[] = new Array<Article>();
        for (const paper of apiPapers) 
        {
            const paperCoauthors: ArticleCoAuthor[] = new Array<ArticleCoAuthor>();
            for (const author of paper.authors) 
            {
                let name: string = author.name;
                if (author.aliases) name = author.aliases[author.aliases.length - 1];
                paperCoauthors.push(new ArticleCoAuthor(author.authorId, name));
            }
            const articleToPush: Article = new Article(
                paper.title,
                paper.venue,
                paper.year,
                paper.citationCount,
                this.getSelfCitationsInPaper(apiAuthor, paper),
                paper.url,
                paper.abstract,
                paperCoauthors,
                paper.publicationDate,
            );
            articles.push(articleToPush);
        }
        return articles;
    }
}
