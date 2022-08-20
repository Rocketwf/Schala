import {
    AffiliationFilter,
    SearchResultsPaginationFilter,
    WordsInTitleFilter,
} from '../../../filters/searchresultsfilters/SearchResultsFilter';
import { Message } from '../../../misc';
import { BasicProfile, SearchResultsModel } from '../../../models';

describe('filters the search results correctly', () => 
{
    let testProfile1: BasicProfile;
    let testProfile2: BasicProfile;
    let testProfile3: BasicProfile;
    let testModel1: SearchResultsModel;
    let testModel2: SearchResultsModel;
    let testModel3: SearchResultsModel;
    beforeEach(() => 
    {
        testProfile1 = new BasicProfile('123', 'Test 1', ['TestAffiliation']);
        testProfile2 = new BasicProfile('456', 'Test 2', ['TestIndustries']);
        testProfile3 = new BasicProfile('789', 'Test 3', ['TestPagination']);
        testModel1 = new SearchResultsModel([testProfile1, testProfile2]);
        testModel2 = new SearchResultsModel([testProfile1, testProfile2, testProfile3]);
        testModel3 = new SearchResultsModel([testProfile1, testProfile2, testProfile3]);
    });
    it('SearchResultsModel must be filtered correctly', async () => 
    {
       
        const affFilter: AffiliationFilter = new AffiliationFilter('');
        const paginationFilter: SearchResultsPaginationFilter = new SearchResultsPaginationFilter(1, 2);
        const wordFilter: WordsInTitleFilter = new WordsInTitleFilter('Test 3');
        affFilter.value = 'Industries';
        affFilter.apply(testModel1);
        paginationFilter.apply(testModel2);
        wordFilter.apply(testModel3);
        expect(testModel1.basicProfiles.includes(testProfile1)).toBe(false);
        expect(testModel1.basicProfiles.includes(testProfile2)).toBe(true);
        expect(testModel2.basicProfiles.length == 2).toBe(true);
        expect(testModel3.basicProfiles[0].name == 'Test 3').toBe(true);
        expect(testModel3.basicProfiles.length == 1).toBe(true);
    });

    it('it copies  and validates affiliation filter', async () => 
    {
        const affFilter: AffiliationFilter = new AffiliationFilter('');
        const f: AffiliationFilter = affFilter.deepCopy();
        const msg: Message = affFilter.validate(testModel1);
        expect(f).toStrictEqual(affFilter);
        expect(msg.status).toBe(0);
    });

    it('it copies  and validates words in the title filter', async () => 
    {
        const wordFilter: WordsInTitleFilter = new WordsInTitleFilter('Test 3');
        const w: WordsInTitleFilter = wordFilter.deepCopy();
        const msg: Message = wordFilter.validate(testModel1);
        expect(w).toStrictEqual(wordFilter);
        expect(msg.status).toBe(0);
    });

    it('it copies  and validates search results pagination filter', async () => 
    {
        const paginationFilter: SearchResultsPaginationFilter = new SearchResultsPaginationFilter(1, 2);
        const page: SearchResultsPaginationFilter = paginationFilter.deepCopy();
        const msg: Message = paginationFilter.validate(testModel1);
        expect(page).toStrictEqual(paginationFilter);
        expect(msg.status).toBe(0);
    });
    it('it check setter and getter of hits per page', async () => 
    {
        const paginationFilter: SearchResultsPaginationFilter = new SearchResultsPaginationFilter(1, 2);
        paginationFilter.hitsPerPage = 15;
        expect(paginationFilter.hitsPerPage).toBe(15);

    });
});
