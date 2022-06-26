import { SemanticScholarSource } from '../datasources';
import { Article } from '../models';
import { FullProfile, HIndex, I10Index, BasicProfile } from '../models/profile';

export class ProfileFactory {
    //TODO: Fix Promise

    private authorId: string; //The current scholar being added

    async build(authorId: string): Promise<FullProfile[]> {
        const name: string = SemanticScholarSource.getInstance().fetchName(authorId);
        const affiliations: string[] = SemanticScholarSource.getInstance().fetchAffiliations(authorId);
        const hIndex: number = SemanticScholarSource.getInstance().fetchHIndex(authorId);
        const citation: number = SemanticScholarSource.getInstance().fetchCitation(authorId);
        const basicProfile: BasicProfile = new BasicProfile(authorId, name, affiliations, citation);
        const hIndexObj: HIndex = new HIndex(hIndex);
        return Array.of(new FullProfile(basicProfile, hIndexObj, null));
    }

    calculateHIndex(): HIndex {
        const fetchedHIndex: number = SemanticScholarSource.getInstance().fetchHIndex(this.authorId);

        let hIndex: number;
        //TODO: Make this Object Oriented
        const copy: Article[] = JSON.parse(
            JSON.stringify(SemanticScholarSource.getInstance().fetchArticles(this.authorId)),
        );
        //If the h10-index could be fetched, returns it. Otherwise calculates it
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

    calculateI10Index(): I10Index {
        const fetchedI10Index: number = SemanticScholarSource.getInstance().fetchI10Index(this.authorId);
        let i10Index: number;
        const copy: Article[] = JSON.parse(
            JSON.stringify(SemanticScholarSource.getInstance().fetchArticles(this.authorId)),
        );
        //If the i10-index could be fetched, returns it. Otherwise calculates it
        if (fetchedI10Index != null) {
            i10Index = fetchedI10Index;
        } else {
            i10Index = 0;
            //Sorting the articles of the scholar by the number of citations
            copy.sort((a: Article, b: Article) => (a.citation > b.citation ? -1 : 1));
            //Calculating the hIndex of the scholar
            copy.forEach((articles: Article, index: number) => {
                index;
                if (articles.citation < 10) {
                    return;
                }
                i10Index++;
            });
        }
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
        const authorPublications: Article[] = JSON.parse(
            JSON.stringify(SemanticScholarSource.getInstance().fetchArticles(this.authorId)),
        );
        //Calculating the number of self-citations by iterating over all the articles of the scholar
        let numberOfSelfCitations: number = 0;
        for (const publication of authorPublications) {
            if (SemanticScholarSource.getInstance().hasSelfCitation(publication, this.authorId)) {
                numberOfSelfCitations++;
            }
        }
        return numberOfSelfCitations;
    }

    calculateIndirectSelfCitations(): number {
        const authorPublications: Article[] = JSON.parse(
            JSON.stringify(SemanticScholarSource.getInstance().fetchArticles(this.authorId)),
        );
        let numberOfIndirectSelfCitations: number = 0;
        for (const publication of authorPublications) {
            for (const coAuthor of publication.coAuthors) {
                if (
                    coAuthor.id != this.authorId && //Otherwise this would also count direct self citations
                    SemanticScholarSource.getInstance().hasSelfCitation(publication, coAuthor.id)
                ) {
                    numberOfIndirectSelfCitations++;
                }
            }
        }

        return numberOfIndirectSelfCitations;
    }
}
