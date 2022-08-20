import { SearchResultsPaginationFilter, WordsInTitleFilter } from '../../../filters';
import { STATUS } from '../../../misc';
import { Article, ArticleCoAuthor, BasicProfile, FullProfile, SearchResultsModel } from '../../../models';
import { Author, CitationByYear, CitedScholar, ProfileExpertise, PublicationByVenue, PublicationByYear } from '../../../models/profile/Profile';

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
        expertises,
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

describe('SearchResultsModel tests', () => 
{
    let basicProfiles: BasicProfile[];
    let searchResultsModel: SearchResultsModel;
    beforeEach(async () => 
    {
        basicProfiles = [fullProfile.basicProfile];
        searchResultsModel = new SearchResultsModel(basicProfiles);
    }, 30000);
    it('checks if deepCopy works right', () => 
    {
        expect(searchResultsModel.deepCopy().basicProfiles).toEqual(basicProfiles);
    });
    it('checks amount of entry', () => 
    {
        expect(searchResultsModel.entries).toBe(1);
    });
    it('checks if getter and setter of filter works right', () => 
    {
        const paginationFilter: SearchResultsPaginationFilter = new SearchResultsPaginationFilter(1, 2);
        const wordFilter: WordsInTitleFilter = new WordsInTitleFilter('Test 1');
        searchResultsModel.filters= [wordFilter];
        expect(searchResultsModel.filters[0]).toStrictEqual(wordFilter);
    });
    it('checks if getter and setter of paginationfilter works right', () => 
    {
        const paginationFilter: SearchResultsPaginationFilter = new SearchResultsPaginationFilter(1, 2);
        searchResultsModel.paginationFilter= paginationFilter;
        expect(searchResultsModel.paginationFilter).toStrictEqual(paginationFilter);
    });
    it('checks if getter and setter of expandable works right', () => 
    {
        searchResultsModel.expandable = true;
        expect(searchResultsModel.expandable).toBe(true);
    });
    it('checks if query is being set correctly', () => 
    {
        const testQuery: string = 'Test Query';
        searchResultsModel.query = testQuery;
        expect(searchResultsModel.query).toBe('Test Query');
    });
    it('checks if isExpanded is being set correctly', () => 
    {
        let testIsExpanded: boolean = true;
        searchResultsModel.isExpanded = testIsExpanded;
        expect(searchResultsModel.isExpanded).toBe(true);
        testIsExpanded = false;
        searchResultsModel.isExpanded = testIsExpanded;
        expect(searchResultsModel.isExpanded).toBe(false);
    });
    it('checks if isExpanded is being set correctly', () => 
    {
        let testIsExpanded: boolean = true;
        searchResultsModel.isExpanded = testIsExpanded;
        expect(searchResultsModel.isExpanded).toBe(true);
        testIsExpanded = false;
        searchResultsModel.isExpanded = testIsExpanded;
        expect(searchResultsModel.isExpanded).toBe(false);
    });
});
