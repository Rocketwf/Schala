import { SemanticScholarSource } from '../datasources';
import { Article } from '../models';
import { FullProfile, HIndex, I10Index } from '../models/profile';

export class ProfileFactory {
    //TODO: Fix Promise
    build(authorId: string): FullProfile[] {
        const semantic: SemanticScholarSource = SemanticScholarSource.getInstance();
        const authorIds: Promise<string[]> = semantic.fetchAuthorIds(authorId);
        authorIds;
        return {} as FullProfile[];
    }

    calculateHIndex(): HIndex {
        const copy: Article[] = JSON.parse(JSON.stringify(this.getArticles));
        //Sorting the articles of the scholar by the number of citations
        copy.sort((a: Article, b: Article) => (a.citation > b.citation ? -1 : 1));
        //Calculating the hIndex of the scholar
        let hIndex: number = 0;
        copy.forEach((articles: Article, index: number) => {
            if (articles.citation < index) {
                return;
            }
            hIndex++;
        });

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

    calculateI10Index(): I10Index {
        const copy: Article[] = JSON.parse(JSON.stringify(this.getArticles));
        //Sorting the articles of the scholar by the number of citations
        copy.sort((a: Article, b: Article) => (a.citation > b.citation ? -1 : 1));
        //Calculating the hIndex of the scholar
        let i10Index: number = 0;
        copy.forEach((articles: Article, index: number) => {
            index;
            if (articles.citation < 10) {
                return;
            }
            i10Index++;
        });

        //Sorting the articles of the scholar by the number of citations without self citations
        copy.sort((a: Article, b: Article) => (a.citation - a.selfCitation > b.citation - b.selfCitation ? -1 : 1));
        //Calculating the i10 index without self citations of the scholar
        let i10IndexWithoutSelfCitations: number = 0;
        copy.forEach((articles: Article, index: number) => {
            if (articles.citation - articles.selfCitation < index) {
                return;
            }
            i10IndexWithoutSelfCitations++;
        });

        return new I10Index(i10Index, i10IndexWithoutSelfCitations);
    }

    calculateSelfCitations(): number {
        return 0;
    }

    calculateIndirectSelfCitations(): number {
        return 0;
    }

    getArticles(): Article[] {
        return null;
    }
}
