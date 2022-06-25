import { SemanticScholarSource } from '../../datasources';
import { Article } from '../../models';

describe('findOrCreate method', () => {
    beforeAll(async () => {
        await SemanticScholarSource.getInstance().fetchAuthorIds('walter tichy');
    });
    it('fetches author ids', async () => {
        await SemanticScholarSource.getInstance()
            .fetchAuthorIds('walter tichy')
            .then((data: string[]) => {
                expect(data).toStrictEqual(['143732150', '1679754', '1395637352', '89914629']);
            });
    });
    it('fetches author name', async () => {
        await SemanticScholarSource.getInstance()
            .fetchHIndex('1679754')
            .then((data: number) => {
                expect(data).toBe(38);
            });
    });
    it('fetches author affiliation', async () => {
        await SemanticScholarSource.getInstance()
            .fetchAffiliations('1679754')
            .then((data: string[]) => {
                expect(data).toBe('Karlsruhe Institute of Technology');
            });
    });
    it('fetches author citation', async () => {
        await SemanticScholarSource.getInstance()
            .fetchCitation('1679754')
            .then((data: number) => {
                expect(data).toBe(7766);
            });
    });
    it('fetches author i10 index', async () => {
        await SemanticScholarSource.getInstance()
            .fetchI10Index('1679754')
            .then((data: number) => {
                expect(data).toBe(118);
            });
    });
    it('fetches author articles', async () => {
        await SemanticScholarSource.getInstance()
            .fetchArticles('1679754')
            .then((data: Article[]) => {
                expect(data.length).toBeGreaterThanOrEqual(277);
            });
    });
    it('checks if author has self-citations', async () => {
        await SemanticScholarSource.getInstance()
            .fetchArticles('1679754')
            .then(async (data: Article[]) => {
                await SemanticScholarSource.getInstance()
                    .hasSelfCitation(data[0], '1679754')
                    .then((data: boolean) => {
                        expect(data).toBe(true);
                    });
            });
    });
});
