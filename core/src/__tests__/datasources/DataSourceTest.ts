import { SemanticScholarSource } from '../../datasources';
import { Article } from '../../models';

describe('findOrCreate method', () => {
    it('fetches author ids', async () => {
        const authorIds: string[] = await SemanticScholarSource.getInstance().fetchAuthorIds('walter tichy');
        expect(authorIds).toStrictEqual(['143732150', '1679754', '1395637352', '89914629']);
    });
    it('fetches author name', async () => {
        const name: string = await SemanticScholarSource.getInstance().fetchName('1679754');
        expect(name).toBe('W. Tichy');
    });
    it('fetches author h-index', async () => {
        const hIndex: number = await SemanticScholarSource.getInstance().fetchHIndex('1679754');
        expect(hIndex).toBe(39);
    });
    it('fetches author affiliation', async () => {
        const affiliation: string[] = await SemanticScholarSource.getInstance().fetchAffiliations('1679754');
        expect(affiliation.length).toBe(0);
    });
    it('fetches author citation', async () => {
        const citation: number = await SemanticScholarSource.getInstance().fetchCitation('1679754');
        expect(citation).toBe(7903);
    });
    //  TODO: Implement fetchI10index, fetchArticles, hasSelfCitation
    // it('fetches author i10 index', async () => {
    //     const i10Index: number = await SemanticScholarSource.getInstance().fetchI10Index('1679754');
    //     expect(data).toBe(118);
    // });
    // it('fetches author articles', async () => {
    //     const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');
    //     expect(data.length).toBeGreaterThanOrEqual(277);
    // });
    // it('checks if author has self-citations', async () => {
    //     const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');
    //     const hasSelfCitation: boolean = await SemanticScholarSource.getInstance().hasSelfCitation(articles[0], '1679754');
    //     expect(hasSelfCitation).toBe(true);
    // });
});
