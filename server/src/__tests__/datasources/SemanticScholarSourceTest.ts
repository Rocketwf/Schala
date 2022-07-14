import { SemanticScholarSource } from '../../datasources/SemanticScholarSource';
import { APIBasicAuthor, APIAuthor, APIPaper } from '../../models/API';

describe('findOrCreate method', () => 
{
    let dataSource: SemanticScholarSource;
    beforeEach(() => 
    {
        dataSource = new SemanticScholarSource();
        dataSource.destruct();
    });
    it('fetches basic authors', async () => 
    {
        const basicAuthors: APIBasicAuthor[] = await dataSource.fetchSearchResults('walter tichy');
        expect(basicAuthors.length > 0).toBe(true);
    }, 30000);
    it('fetches author ids', async () => 
    {
        const author: APIAuthor = await dataSource.fetchAuthor('1679754');
        expect(author.aliases.length).toBe(5);
    }, 30000);
    it('fetches papers', async () => 
    {
        const papers: APIPaper[] = await dataSource.fetchPapers([
            'e64bc2637e4aff5099506a6fb4725dc2543b3a1b',
            'e0a42ebc52f83d59da052a07db57448ff8045304',
        ]);
        expect(papers.length > 0).toBe(true);
    }, 30000);
    it('checks error message of fetchAuthor', async () => 
    {
        try 
        {
            await dataSource.fetchAuthor('0000000000000');
            expect(true).toBe(false);
        }
        catch (error) 
        {
            expect(error.message).toBe('Request failed with status code 404');
        }
    }, 30000);
    it('checks error message of fetchSearchResults', async () => 
    {
        try 
        {
            await dataSource.fetchSearchResults('');
            expect(true).toBe(false);
        }
        catch (error) 
        {
            expect(error.message).toBe('Request failed with status code 400');
        }
    }, 30000);
});
