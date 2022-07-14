// import { SemanticScholarSource } from '../../datasources';
// import { Article } from '../../models';

import { SemanticScholarSource } from '../../datasources/SemanticScholarSource';
import { BasicProfile, FullProfile } from '../../models';

describe('findOrCreate method', () => 
{
    it('fetches author ids', async () => 
    {
        const basicAuthors: BasicProfile[] = await SemanticScholarSource.getInstance().fetchSearchResults('walter tichy');
        const authorIDs: string[] =[];
        for(const basicAuthor of basicAuthors)
        {
            authorIDs.push(basicAuthor.id);
        }
        expect(authorIDs).toStrictEqual(['143732150', '1679754', '1395637352', '89914629']);
    }, 30000);

    it('fetches an author and checks name', async () => 
    {
        const author: FullProfile = await SemanticScholarSource.getInstance().fetchFullProfile('1679754');
        expect(author.basicProfile.name).toBe('Walter F Tichy');
    }, 30000);

    //it('fetches the correct first paper', async () => {
    //const articles: APIPaper[] = await SemanticScholarSource.getInstance().fetcPapers('1679754');
    //expect(articles.length > 0).toBe(true);
    //}, 30000);

    //it('fetchs the citation count of author', async () => {
    //const authors: APIAuthor[] = await SemanticScholarSource.getInstance().fetchAuthor('1679754');
    //expect(authors[0].citationCount != null).toBe(true);
    //});

    // it('fetches a h-Index', async () => {
    //const authors: APIAuthor[] = await SemanticScholarSource.getInstance().fetchAuthor('1679754');
    //     expect(authors[0].hIndex != null).toBe(true);
    // }, 30000);

    // it('fetches an author affiliation', async () => {
    //const authors: APIAuthor[] = await SemanticScholarSource.getInstance().fetchAuthor('1679754');
    //     expect(authors[0].affiliation.length > 0).toBe(true);
    // }, 30000);

    //it('fetches paper reference count', async () => {
    //const articles: APIPaper[] = await SemanticScholarSource.getInstance().fetcPapers('1679754');
    //expect(articles[0].referenceCount > 0).toBe(true);
    //});

    // it('fetches author i10 index', async () => {
    //  const authors: APIAuthor[] = await SemanticScholarSource.getInstance().fetchAuthor('1679754');
    //     expect(authors[0].i10Index != null).toBe(true);
    // }, 30000);

    // it('fetches author articles', async () => {
    //     const authors: APIAuthor[] = await SemanticScholarSource.getInstance().fetchAuthor('1679754');
    //     expect(authors[0].articles.length > 100).toBeGreaterThanOrEqual(true);
    // }, 30000);

    // it('fetches website of author's page, async () => {
    //     const authors: APIAuthor[] = await SemanticScholarSource.getInstance().fetchAuthor('1679754');
    //     expect(authors[0].homepage != null).toBe(true);
    // });
});
