import { SemanticScholarSource } from '../../datasources/SemanticScholarSource';
import { APIBasicAuthor, APIAuthor, APIPaper } from '../../models/API';

describe('findOrCreate method', () => 
{
    it('fetches basic authors', async () => 
    {
        const basicAuthors: APIBasicAuthor[] = await new SemanticScholarSource().fetchSearchResults('walter tichy');
        expect(basicAuthors.length > 0).toBe(true);
    }, 30000);
    it('check error', async () => 
    {
        const sem: SemanticScholarSource = new SemanticScholarSource();
        expect(() => sem.fetchAuthor('1679754')).not.toThrow(Error);
    }, 30000);
    it('fetches author ids', async () => 
    {
        const author: APIAuthor = await new SemanticScholarSource().fetchAuthor('1679754');
        expect(author.aliases.length).toBe(5);
    }, 30000);
    it('fetches papers', async () => 
    {
        const papers: APIPaper[] = await new SemanticScholarSource().fetchPapers([
            'e64bc2637e4aff5099506a6fb4725dc2543b3a1b',
            'e0a42ebc52f83d59da052a07db57448ff8045304',
        ]);
        expect(papers.length > 0).toBe(true);
    }, 30000);
});
