import { SemanticScholarSource } from '../../datasources';

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
});
