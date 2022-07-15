import { GoogleScholarScraperSource } from '../../datasources/GoogleScholarScraperSource';
// image is never '' and parameters of levensteinHelper are never 0 except them all of the lines are covered
describe('Fetch author and check for author id', () =>
{
    it('Georgios Zervakis ID', async () => 
    {
        expect(await(await new GoogleScholarScraperSource().fetchAuthor('Georgios Zervakis')).authorId).toBe('hZtfPegAAAAJ');
    }); 
});

describe('Test empty author name for papers', () =>
{
    it('Test papers of empty author name', async () => 
    {
        expect(await(await new GoogleScholarScraperSource().fetchPapers(['']))).toBeFalsy;
    });
});

describe('Test empty author name for full profile', () =>
{
    it('Test full profile of empty author name', async () => 
    {
        expect(await (await new GoogleScholarScraperSource().fetchAuthor('')).affiliations).toBe(null);
    });
});

describe('Fetch author and check for website', () =>
{
    it('Mehdi Tahoori url', async () => 
    {
        expect(await(await new GoogleScholarScraperSource().fetchAuthor('Mehdi Tahoori')).url).toBe('http://cdnc.itec.kit.edu/');
    }); 
});

describe('Compare two search queries length', () =>
{
    it('Gregor Snelting double search', async () => 
    {
        const gss: GoogleScholarScraperSource = new GoogleScholarScraperSource();
        const firstSearchLength: number = await (await gss.fetchSearchResults('Gregor Snelting')).length;
        expect(await(await gss.fetchSearchResults('Gregor Snelting')).length).toBe(firstSearchLength);
    }); 
});

describe('Fetch Snelting photo', () =>
{
    it('Expect default photo', async () => 
    {
        expect(await(await new GoogleScholarScraperSource().fetchSearchResults('Gregor Snelting'))[0].profilePicture).toBe
        ('https://scholar.google.com/citations/images/avatar_scholar_128.png');
    }); 
});
