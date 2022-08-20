// import { SemanticScholarSource } from '../../datasources';
// import { Article } from '../../models';

import { Article, ArticleCoAuthor, BasicProfile, FullProfile } from '../../models';
import { Author, CitationByYear, CitedScholar, ProfileExpertise, PublicationByVenue, PublicationByYear } from '../../models/profile/Profile';

let fullProfile: FullProfile;
beforeAll(() => 
{
    const bp: BasicProfile = new BasicProfile(
        '1679754',
        'Walter Tichy',
        ['Karlsruhe Institute of Technology'],
        7693,
        270,
        'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=23RPQBQAAAAJ&citpid=2',  
    );
    const pbyArray:Array<PublicationByYear> = new Array<PublicationByYear>();
    const cbyArray:Array<CitationByYear> = new Array<CitationByYear>();
    for(let i: number = 1975 ; i <= 2022; i++)
    {
        const pby:PublicationByYear = new PublicationByYear(i,5);
        pbyArray.push(pby);
        const cby:CitationByYear = new CitationByYear(i,100,50,200);
        cbyArray.push(cby);
    }
    const pbvArray:Array<PublicationByVenue> = new Array<PublicationByVenue>();
    const pbv:PublicationByVenue = new PublicationByVenue('KIT',9400);
    pbvArray.push(pbv);
    const citedScholars:Array<CitedScholar> = new Array<CitedScholar>();
    citedScholars.push(new CitedScholar('Yigit Oguz',42));
    const authors: Array<Author> = new Array<Author>();
    authors.push(new Author('Om Prakash',100,11));
    const articles:Array<Article> = new Array<Article>();
    const coAuthors: Array<ArticleCoAuthor> = new Array<ArticleCoAuthor>();
    coAuthors.push(new ArticleCoAuthor('4242422','Georgios Zervakis'));
    const expertises: ProfileExpertise[] = [];
    expertises.push(new ProfileExpertise('Computer Science',100));
    expertises.push(new ProfileExpertise('Mathematics',30));
    expertises.push(new ProfileExpertise('Engineering',20));
    articles.push(new Article('Turing machine simulator','KIT',1977,15,1,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Engineering']));
    const fp: FullProfile = new FullProfile(
        31,
        22,
        118,
        60,
        3031,
        1340,
        9400,
        'https://ps.ipd.kit.edu/',
        bp,
        pbyArray,
        pbvArray,
        cbyArray,
        citedScholars,
        authors,
        articles,
    );
    fullProfile=fp;
});

describe('findOrCreate method', () => 
{
    it('fetches author ids', async () => 
    {
        const basicAuthors: BasicProfile[] = [fullProfile.basicProfile];
        const authorIDs: string[] =[];
        for(const basicAuthor of basicAuthors)
        {
            authorIDs.push(basicAuthor.id);
        }
        expect(authorIDs).toStrictEqual(['1679754']);
    }, 30000);

    it('fetches an author and checks name', async () => 
    {
        const author: FullProfile = fullProfile;
        expect(author.basicProfile.name).toBe('Walter Tichy');
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
