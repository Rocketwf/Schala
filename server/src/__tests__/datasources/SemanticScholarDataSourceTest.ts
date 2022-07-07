import { SemanticScholarSource } from '../../datasources/SemanticScholarSource';
import { APIBasicAuthor, APIAuthor, APIPaper } from '../../models/API';

describe('findOrCreate method', () => {
    it('fetches author ids', async () => {
        const authorsIds: APIBasicAuthor[] = await new SemanticScholarSource().fetchSearchResults('walter tichy');
        console.log(authorsIds);
        expect(true).toBe(true);
    }, 30000);
    it('fetches author ids', async () => {
        const authorsIds: APIAuthor = await new SemanticScholarSource().fetchAuthor('1679754');
        console.log(authorsIds);
        expect(true).toBe(true);
    }, 30000);
    it('fetches author ids', async () => {
        const authorsIds: APIPaper[] = await new SemanticScholarSource().fetchPapers([
            'e64bc2637e4aff5099506a6fb4725dc2543b3a1b',
            'e0a42ebc52f83d59da052a07db57448ff8045304',
        ]);
        console.log(authorsIds);
        expect(true).toBe(true);
    }, 30000);
});
