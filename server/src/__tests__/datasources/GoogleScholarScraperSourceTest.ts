import { GoogleScholarScraperSource } from '../../datasources/GoogleScholarScraperSource';

describe('Fetch author and check for id', () =>
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

describe('Fetch author and check for id', () =>
{
    it('Georgios Zervakis ID', async () => 
    {
        expect(await(await new GoogleScholarScraperSource().fetchAuthor('Georgios Zervakis')).authorId).toBe('hZtfPegAAAAJ');
    }); 
});

describe('Fetch author and check for website', () =>
{
    it('Mehdi Tahoori url', async () => 
    {
        expect(await(await new GoogleScholarScraperSource().fetchAuthor('Mehdi Tahoori')).url).toBe('http://cdnc.itec.kit.edu/');
    }); 
});

describe('Search for Gregor Snelting', () =>
{
    it('Gregor Snelting', async () => 
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
        console.log(await (await new GoogleScholarScraperSource().fetchSearchResults('Gregor Snelting'))[0].profilePicture);
        expect(await(await new GoogleScholarScraperSource().fetchSearchResults('Gregor Snelting'))[0].profilePicture).toBe
        ('https://scholar.google.com/citations/images/avatar_scholar_128.png');
    }); 
});