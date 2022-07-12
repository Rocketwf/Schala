import {
    AffiliationFilter,
    SearchResultsPaginationFilter,
} from '../../../filters/searchresultsfilters/SearchResultsFilter';
import { BasicProfile, SearchResultsModel } from '../../../models';

describe('filters the search results correctly', () => 
{
    it('SearchResultsModel must be filtered correctly', async () => 
    {
        const testProfile1: BasicProfile = new BasicProfile('123', 'Test 1', ['TestAffiliation']);
        const testProfile2: BasicProfile = new BasicProfile('456', 'Test 2', ['TestIndustries']);
        const testProfile3: BasicProfile = new BasicProfile('789', 'Test 3', ['TestPagination']);
        const testModel1: SearchResultsModel = new SearchResultsModel([testProfile1, testProfile2]);
        const testModel2: SearchResultsModel = new SearchResultsModel([testProfile1, testProfile2, testProfile3]);
        const testFilter: AffiliationFilter = new AffiliationFilter('');
        const paginationFilter: SearchResultsPaginationFilter = new SearchResultsPaginationFilter(1, 2);
        testFilter.value = 'Industries';
        testFilter.apply(testModel1);
        paginationFilter.apply(testModel2);
        expect(testModel1.basicProfiles.includes(testProfile1)).toBe(false);
        expect(testModel1.basicProfiles.includes(testProfile2)).toBe(true);
        expect(testModel2.basicProfiles.length == 2).toBe(true);
    });
});
