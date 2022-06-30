import { DataSource, SemanticScholarSource } from '../datasources';
import { Article } from '../models';
import { FullProfile, HIndex, I10Index, BasicProfile } from '../models/profile';

export class ProfileFactory {
    private dataSource: DataSource = SemanticScholarSource.getInstance();

    private authorId: string; //The current scholar being added

    async build(authorId: string): Promise<FullProfile[]> {
        this.authorId = authorId;
        const name: string = await this.dataSource.fetchName(authorId);
        const affiliations: string[] = await this.dataSource.fetchAffiliations(authorId);
        const citation: number = await this.dataSource.fetchCitation(authorId);
        const basicProfile: BasicProfile = new BasicProfile(authorId, name, affiliations, citation);
        const hIndexObj: HIndex = await this.calculateHIndex();
        const i10IndexObj: I10Index = await this.calculateI10Index();
        const articles: Article[] = await this.dataSource.fetchArticles(authorId);
        //const selfCitations: number = await this.calculateSelfCitations();
        //const indirectSelfCitations: number = await this.calculateIndirectSelfCitations();
        const website: string = await this.dataSource.fetchWebsite(authorId);
        return Array.of(new FullProfile(basicProfile, hIndexObj, i10IndexObj, 42, 42, articles, website));
    }

    async calculateHIndex(): Promise<HIndex> {
        const fetchedHIndex: number = await this.dataSource.fetchHIndex(this.authorId);
        let hIndex: number;
        const copy: Article[] = new Array<Article>();
        const articles: Article[] = await this.dataSource.fetchArticles(this.authorId);
        for (const article of articles) {
            copy.push(
                new Article(
                    article.id,
                    article.title,
                    article.year,
                    article.citation,
                    article.selfCitation,
                    article.bibTex,
                    article.url,
                    article.venue,
                    article.coAuthors,
                ),
            );

            //If the h-index could be fetched, returns it. Otherwise calculates it
            if (fetchedHIndex != null) {
                hIndex = fetchedHIndex;
            } else {
                hIndex = 0;
                //Sorting the articles of the scholar by the number of citations
                copy.sort((a: Article, b: Article) => (a.citation > b.citation ? -1 : 1));
                //Calculating the hIndex of the scholar

                copy.forEach((articles: Article, index: number) => {
                    if (articles.citation < index) {
                        return;
                    }
                    hIndex++;
                });
            }

            //Sorting the articles of the scholar by the number of citations without self citations
            copy.sort((a: Article, b: Article) => (a.citation - a.selfCitation > b.citation - b.selfCitation ? -1 : 1));
            //Calculating the hIndex without self citations of the scholar
            let hIndexWithoutSelfCitations: number = 0;
            copy.forEach((articles: Article, index: number) => {
                if (articles.citation - articles.selfCitation < index) {
                    return;
                }
                hIndexWithoutSelfCitations++;
            });
            return new HIndex(hIndex, hIndexWithoutSelfCitations);
        }
    }
    async calculateI10Index(): Promise<I10Index> {
        const fetchedI10Index: number = await this.dataSource.fetchI10Index(this.authorId);
        const authorArticles: Article[] = await this.dataSource.fetchArticles(this.authorId);
        let i10Index: number;
        //If the i10-index could be fetched, returns it. Otherwise calculates it
        if (fetchedI10Index != null) {
            i10Index = fetchedI10Index;
        } else {
            i10Index = 0;
            //Calculating the hIndex of the scholar
            for (const article of authorArticles) {
                if (article.citation >= 10) {
                    i10Index++;
                }
            }
        }
        //Counts the number of articles which have more than 10 citations
        let i10IndexWithoutSelfCitations: number = 0;
        for (const article of authorArticles) {
            if (article.citation - article.selfCitation >= 10) {
                i10IndexWithoutSelfCitations++;
            }
        }
        const createdI10Index: I10Index = new I10Index(i10Index, i10IndexWithoutSelfCitations);
        return createdI10Index;
    }

    async calculateSelfCitations(): Promise<number> {
        const articles: Article[] = await this.dataSource.fetchArticles(this.authorId);
        let selfCitation: number = 0;
        for (const article of articles) {
            const hasSelfCitation: boolean = await this.dataSource.hasSelfCitation(article, this.authorId);
            if (hasSelfCitation) ++selfCitation;
        }
        return selfCitation;
    }

    async calculateIndirectSelfCitations(): Promise<number> {
        //const authorPublications: Article[] = new Array<Article>();
        const articles: Article[] = await this.dataSource.fetchArticles(this.authorId);
        /*for (const article of articles) {
            authorPublications.push(
                new Article(
                    article.id,
                    article.title,
                    article.year,
                    article.citation,
                    article.selfCitation,
                    article.bibTex,
                    article.url,
                    article.venue,
                    article.coAuthors,
                ),
            );*/
        let numberOfIndirectSelfCitations: number = 0;
        for (const publication of articles) {
            for (const coAuthor of publication.coAuthors) {
                const hasSelfCitation: boolean = await this.dataSource.hasSelfCitation(publication, coAuthor.id);
                if (
                    coAuthor.id != this.authorId && //Otherwise this would also count direct self citations
                    hasSelfCitation
                ) {
                    numberOfIndirectSelfCitations++;
                }
            }
        }
        return numberOfIndirectSelfCitations;
    }
}
