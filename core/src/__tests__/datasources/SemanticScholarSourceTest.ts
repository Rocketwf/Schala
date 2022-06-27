import { SemanticScholarSource } from '../../datasources';
import { Article } from '../../models';

describe('findOrCreate method', () => {
    it('fetches author ids', async () => {
        const authorsIds: string[] = await SemanticScholarSource.getInstance().fetchAuthorIds('walter tichy');
        expect(authorsIds).toStrictEqual(['143732150', '1679754', '1395637352', '89914629']);
    });
    it('HIndex of tichy should be 3', async () => {
        const hIndex: number = await SemanticScholarSource.getInstance().fetchHIndex('1679754');
        expect(hIndex).toBe(39);
    });
    it('HIndex of tichy should be 3', async () => {
        const name: string = await SemanticScholarSource.getInstance().fetchName('1679754');
        expect(name).toBe('W. Tichy');
    });
    //it('fetches the correct first paper', async () => {
        //const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');
        //expect(articles[0].title).toBe('Software Architectures (Dagstuhl Seminar 9508)');
    //});
    it('fetches the correct citation count', async () => {
        const citation: number = await SemanticScholarSource.getInstance().fetchCitation('1679754');
        expect(citation).toBe(7903);
    });
    it('fetches the correct h-Index', async () => {
        const hIndex: number = await SemanticScholarSource.getInstance().fetchHIndex('1679754');
        expect(hIndex).toBe(39);
    });
});
