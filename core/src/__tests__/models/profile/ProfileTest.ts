import { Article, Author, BasicProfile, CitationByYear, CitedScholar, FullProfile, ProfileExpertise, PublicationByVenue, PublicationByYear } from '../../../models';

let basicProfile: BasicProfile;
let fullProfile: FullProfile;
let citationByYear: CitationByYear;
let publicationByYear: PublicationByYear;
let publicationByVenue: PublicationByVenue;
let citedScholar: CitedScholar;
let author: Author;
let profileExpertise: ProfileExpertise;

beforeAll(() => 
{
    basicProfile = new BasicProfile('');
    fullProfile = new FullProfile(
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        '',
        null,
        [],
        [],
        [],
        [],
        [],
        []
    );
    citationByYear = new CitationByYear(0, 0, 0, 0,);
    publicationByYear = new PublicationByYear(0, 0);
    publicationByVenue = new PublicationByVenue('', 0);
    citedScholar = new CitedScholar('', 0);
    author = new Author('', 0, 0);
    profileExpertise = new ProfileExpertise('', 0);
});

describe('Basic Profile tests', () => 
{
    it('sets and returns correct id', () => 
    {
        const testID: string = 'ABC123';
        basicProfile.id = testID;
        expect(basicProfile.id).toBe('ABC123');
    });
    it('sets and returns correct name', () => 
    {
        const testName: string = 'Test Name';
        basicProfile.name = testName;
        expect(basicProfile.name).toBe('Test Name');
    });
    it('sets and returns correct affiliations', () => 
    {
        const testAffiliation: string[] = ['Test Affiliation'];
        basicProfile.affiliation = testAffiliation;
        expect(basicProfile.affiliation).toMatchObject(['Test Affiliation']);
    });
    it('sets and returns correct picture URL', () => 
    {
        const testURL: string = 'Test URL';
        basicProfile.pictureURL = testURL;
        expect(basicProfile.pictureURL).toBe('Test URL');
    });
    it('sets and returns correct total citations', () => 
    {
        const testTotalCitations: number = 10;
        basicProfile.totalCitations = testTotalCitations;
        expect(basicProfile.totalCitations).toBe(10);
    });
    it('sets and returns correct paper count', () => 
    {
        const testPaperCount: number = 10;
        basicProfile.paperCount = testPaperCount;
        expect(basicProfile.paperCount).toBe(10);
    });
});

describe('Full Profile tests', () => 
{
    it('sets and returns correct publication by year', () => 
    {
        const testpby: PublicationByYear[] = [new PublicationByYear(2000, 10), new PublicationByYear(2001, 15)];
        fullProfile.publicationsByYear = testpby;
        expect(fullProfile.publicationsByYear).toMatchObject(testpby);
    });
    it('sets and returns correct publications by venue', () => 
    {
        const testpbv: PublicationByVenue[] = [new PublicationByVenue('A', 10), new PublicationByVenue('B', 20)];
        fullProfile.publicationsByVenue = testpbv;
        expect(fullProfile.publicationsByVenue).toMatchObject(testpbv);
    });
    it('sets and returns correct citation by year', () => 
    {
        const testcby: CitationByYear[] = [new CitationByYear(2000, 10, 5, 200)];
        fullProfile.citationsByYear = testcby;
        expect(fullProfile.citationsByYear).toMatchObject(testcby);
    });
    it('sets and returns correct cited scholars', () => 
    {
        const testCitedScholars: CitedScholar[] = [new CitedScholar('Test Scholar', 5)];
        fullProfile.citedScholars = testCitedScholars;
        expect(fullProfile.citedScholars).toMatchObject(testCitedScholars);
    });
    it('sets and returns correct articles', () => 
    {
        const testArticles: Article[] = [new Article(
            'Test Title',
            'Test Venue',
            2000,
            100,
            20,
            'Test URL',
            [],
            'Test Abstract',
            '2000.01.01',
            'Test Bibtex',
            'Test Journal',
            []
        )];
        fullProfile.articles = testArticles;
        expect(fullProfile.articles).toMatchObject(testArticles);
    });
    it('sets and returns correct i10-index without self citations', () => 
    {
        const testi10wsc: number = 10;
        fullProfile.i10IndexWithoutSelfCitations = testi10wsc;
        expect(fullProfile.i10IndexWithoutSelfCitations).toBe(10);
    });
    it('sets and returns correct i10-index', () => 
    {
        const testi10: number = 10;
        fullProfile.i10Index = testi10;
        expect(fullProfile.i10Index).toBe(10);
    });
    it('sets and returns correct h-index', () => 
    {
        const testHindex: number = 10;
        fullProfile.hIndex = testHindex;
        expect(fullProfile.hIndex).toBe(10);
    });
    it('sets and returns correct h-index without self citations', () => 
    {
        const testh10wsc: number = 10;
        fullProfile.hIndexWithoutSelfCitations = testh10wsc;
        expect(fullProfile.hIndexWithoutSelfCitations).toBe(10);
    });
    it('sets and returns correct basic profile', () => 
    {
        fullProfile.basicProfile = basicProfile;
        expect(basicProfile).toMatchObject(basicProfile);
    });
    it('sets and returns correct self citation count', () => 
    {
        const testSelfCitationCount: number = 10;
        fullProfile.selfCitationsCount = testSelfCitationCount;
        expect(fullProfile.selfCitationsCount).toBe(10);
    });
    it('sets and returns correct indirect self citation count', () => 
    {
        const testIndirectSelfCitationCount: number = 10;
        fullProfile.indirectSelfCitationsCount = testIndirectSelfCitationCount;
        expect(fullProfile.indirectSelfCitationsCount).toBe(10);
    });
    it('sets and returns correct publications count', () => 
    {
        expect(fullProfile.publicationsCount).toBe(1);
    });
    it('sets and returns correct authors', () => 
    {
        const testAuthors: Author[] = [new Author('Test Author', 10, 20)];
        fullProfile.authors = testAuthors;
        expect(fullProfile.authors).toMatchObject(testAuthors);
    });
    it('sets and returns correct url', () => 
    {
        const testURL: string = 'Test URL';
        fullProfile.url = testURL;
        expect(fullProfile.url).toBe('Test URL');
    });
});

describe('Citation by year tests', () => 
{
    it('sets and returns correct year', () => 
    {
        const testYear: number = 2000;
        citationByYear.year = testYear;
        expect(citationByYear.year).toBe(2000);
    });
    it('sets and returns correct citation count', () => 
    {
        const testSelfCitationCount: number = 2000;
        citationByYear.selfCitationCount = testSelfCitationCount;
        expect(citationByYear.selfCitationCount).toBe(2000);
    });
    it('sets and returns correct indirect self citation count', () => 
    {
        const testIndirectSelfCitationsCount: number = 2000;
        citationByYear.indirectSelfCitationsCount = testIndirectSelfCitationsCount;
        expect(citationByYear.indirectSelfCitationsCount).toBe(2000);
    });
    it('sets and returns correct total citation count', () => 
    {
        const testTotalCitationsCount: number = 2000;
        citationByYear.totalCitationsCount = testTotalCitationsCount;
        expect(citationByYear.totalCitationsCount).toBe(2000);
    });
});

describe('Publication by year tests', () => 
{
    it('sets and returns correct year', () => 
    {
        const testYear: number = 2000;
        publicationByYear.year = testYear;
        expect(publicationByYear.year).toBe(2000);
    });
    it('sets and returns correct publication count', () => 
    {
        const testPublicationCount: number = 50;
        publicationByYear.publicationsCount = testPublicationCount;
        expect(publicationByYear.publicationsCount).toBe(50);
    });
});

describe('Publication by venue tests', () => 
{
    it('sets and returns correct venue', () => 
    {
        const testVenue: string = 'Test Venue';
        publicationByVenue.venue = testVenue;
        expect(publicationByVenue.venue).toBe('Test Venue');
    });
    it('sets and returns correct publication count', () => 
    {
        const testPublicationCount: number = 50;
        publicationByVenue.publicationCount = testPublicationCount;
        expect(publicationByVenue.publicationCount).toBe(50);
    });
});

describe('Cited scholar tests', () => 
{
    it('sets and returns correct name', () => 
    {
        const testName: string = 'Test Name';
        citedScholar.name = testName;
        expect(citedScholar.name).toBe('Test Name');
    });
    it('sets and returns correct citation count', () => 
    {
        const testCitationCount: number = 100;
        citedScholar.citationsCount = testCitationCount;
        expect(citedScholar.citationsCount).toBe(100);
    });
});

describe('Author tests', () => 
{
    it('sets and returns correct name', () => 
    {
        const testName: string = 'Test Name';
        author.name = testName;
        expect(author.name).toBe('Test Name');
    });
    it('sets and returns correct publication count', () => 
    {
        const testPublicationCount: number = 50;
        author.jointPublicationCount = testPublicationCount;
        expect(author.jointPublicationCount).toBe(50);
    });
    it('sets and returns correct h-index', () => 
    {
        const testHindex: number = 20;
        author.hIndex = testHindex;
        expect(author.hIndex).toBe(20);
    });
});

describe('Profile expertise tests', () => 
{
    it('sets and returns correct name', () => 
    {
        const testName: string = 'Test Name';
        profileExpertise.name = testName;
        expect(profileExpertise.name).toBe('Test Name');
    });
    it('sets and returns correct count', () => 
    {
        const testCount: number = 20;
        profileExpertise.count = testCount;
        expect(profileExpertise.count).toBe(20);
    });
});