import { SemanticScholarSource } from '../../datasources';
import { Article } from '../../models';

describe('findOrCreate method', () => {
    it('fetches author ids', async () => {
        const authorsIds: string[] = await SemanticScholarSource.getInstance().fetchAuthorIds('walter tichy');
        expect(authorsIds).toStrictEqual(['143732150', '1679754', '1395637352', '89914629']);
    });
    it('fetches the correct first paper', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');
        expect(articles[0].title).toBe('Software Architectures (Dagstuhl Seminar 9508)');
    });
    // TODO: Write a meaningful test case that doesn't break on api data changes
    //it('fetches the correct citation count', async () => {
    //const citation: number = await SemanticScholarSource.getInstance().fetchCitation('1679754');
    //expect(citation).toBe(7903);
    //});
    it('fetches the correct h-Index', async () => {
        const hIndex: number = await SemanticScholarSource.getInstance().fetchHIndex('1679754');
        expect(hIndex).toBe(39);
    });
    it('fetches author affiliation', async () => {
        const affiliation: string[] = await SemanticScholarSource.getInstance().fetchAffiliations('1679754');
        expect(affiliation.length).toBe(0);
    });
    // TODO: Write a meaningful test case that doesn't break on api data changes
    //it('fetches author citation', async () => {
    //const citation: number = await SemanticScholarSource.getInstance().fetchCitation('1679754');
    //expect(citation).toBe(7903);
    //});
    it('fetches author i10 index', async () => {
        const i10Index: number = await SemanticScholarSource.getInstance().fetchI10Index('1679754');
        expect(i10Index).toBe(null);
    });
    it('fetches author articles', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');
        expect(articles.length).toBeGreaterThanOrEqual(200);
    });
    // it('checks if author has self-citations', async () => {
    //     const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');
    //     const hasSelfCitation: boolean = await SemanticScholarSource.getInstance().hasSelfCitation(articles[0], '1679754');
    //     expect(hasSelfCitation).toBe(true);
    // });
});
