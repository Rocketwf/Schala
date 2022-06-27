import { SemanticScholarSource } from '../../datasources';

describe('findOrCreate method', () => {
    it('fetches author ids', async () => {
        const authorIds: string[] = await SemanticScholarSource.getInstance().fetchAuthorIds('walter tichy');
        expect(authorIds).toStrictEqual(['143732150', '1679754', '1395637352', '89914629']);
    });
    it('HIndex of tichy should be 3', async () => {
        const hIndex: number = await SemanticScholarSource.getInstance().fetchHIndex('1679754');
        expect(hIndex).toBe(39);
    });
    //it('HIndex of tichy should be 3', async () => {
    //await SemanticScholarSource.getInstance()
    //.fetchName('1679754')
    //.then((data: string) => {
    //expect(data).toBe('W. Tichy');
    //});
    //});
});
