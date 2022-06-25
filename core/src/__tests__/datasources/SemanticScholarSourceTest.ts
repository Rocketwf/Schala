import { SemanticScholarSource } from '../../datasources';
import { Article } from '../../models';

describe('findOrCreate method', () => {
    it('fetches author ids', async () => {
        await SemanticScholarSource.getInstance()
            .fetchAuthorIds('walter tichy')
            .then((data: string[]) => {
                expect(data).toStrictEqual(['143732150', '1679754', '1395637352', '89914629']);
            });
    });
    it('HIndex of tichy should be 3', async () => {
        await SemanticScholarSource.getInstance()
            .fetchHIndex('1679754')
            .then((data: number) => {
                expect(data).toBe(39);
            });
    });
    it('HIndex of tichy should be 3', async () => {
        await SemanticScholarSource.getInstance()
            .fetchName('1679754')
            .then((data: string) => {
                expect(data).toBe('W. Tichy');
            });
    });
});

test('Fetching the correct first paper', async () => {
    await SemanticScholarSource.getInstance()
        .fetchArticles('1679754')
        .then((data: Article[]) => {
            expect(data[0].title).toBe('Software Architectures (Dagstuhl Seminar 9508)');
        });
});
test('Fetching the correct citation count', async () => {
    await SemanticScholarSource.getInstance()
        .fetchCitation('1679754')
        .then((data: number) => {
            expect(data).toBe(7903);
        });
});
test('Fetching the correct h-Index', async () => {
    await SemanticScholarSource.getInstance()
        .fetchCitation('1679754')
        .then((data: number) => {
            expect(data).toBe(39);
        });
});
