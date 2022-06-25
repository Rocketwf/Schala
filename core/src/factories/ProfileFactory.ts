import { SemanticScholarSource } from '../datasources';
import { Article } from '../models';
import { FullProfile, HIndex, I10Index } from '../models/profile';

export class ProfileFactory {
    //TODO: Fix Promise

    private semantic: SemanticScholarSource = null;
    private authorId: string; //The current scholar being added

    build(authorId: string): FullProfile[] {
        const semantic: SemanticScholarSource = SemanticScholarSource.getInstance();
        const authorIds: Promise<string[]> = semantic.fetchAuthorIds(authorId);
        //TODO: Initialize and set authorID to the right value
        authorIds;
        return {} as FullProfile[];
    }

    calculateHIndex(): HIndex {
        const copy: Article[] = JSON.parse(JSON.stringify(this.semantic.fetchArticles(this.authorId)));
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
        const copy: Article[] = JSON.parse(JSON.stringify(this.semantic.fetchArticles(this.authorId)));
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
        const authorPublications: Map<Article, Article[]> = JSON.parse(
            JSON.stringify(this.semantic.fetchArticlesCiting(this.authorId)),
        );
        //Calculating the number of self-citations by iterating over all the articles of the scholar
        let numberOfSelfCitations: number = 0;
        for (const [, citingArticles] of authorPublications) {
            for (const article of citingArticles) {
                for (const author of article.coAuthors) {
                    if (author.id === this.authorId) {
                        numberOfSelfCitations++;
                        break;
                    }
                }
            }
        }
        return numberOfSelfCitations;
    }

    calculateIndirectSelfCitations(): number {
        const citationMap: Map<Article, Article[]> = JSON.parse(
            JSON.stringify(this.semantic.fetchArticlesCiting(this.authorId)),
        );
        let numberOfIndirectSelfCitations: number = 0;
        let lastNumberOfIndirectSelfCitations: number = 0;
        for (const [citedArticle, citingArticle] of citationMap) {
            for (const currentArticle of citingArticle) {
                for (const citingPaperCoauthor of currentArticle.coAuthors) {
                    for (const citedPaperCoauthors of citedArticle.coAuthors) {
                        if (citingPaperCoauthor.id === citedPaperCoauthors.id) {
                            numberOfIndirectSelfCitations++;
                        }
                    }
                    //needed to break out of the loop of coauthors and move on to the next article to not have duplicate indirect self citations count
                    if (numberOfIndirectSelfCitations != lastNumberOfIndirectSelfCitations) {
                        lastNumberOfIndirectSelfCitations = numberOfIndirectSelfCitations;
                        break;
                    }
                }
            }
        }
        return numberOfIndirectSelfCitations;
    }
}
