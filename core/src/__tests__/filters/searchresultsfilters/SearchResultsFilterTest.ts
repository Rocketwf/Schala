import { AffiliationFilter } from '../../../filters/searchresultsfilters/SearchResultsFilter';
import { BasicProfile, SearchResultsModel } from '../../../models';


describe('filters the search results correctly', () => {
    it('SearchResultsModel must be filtered correctly', async () => {
        const testProfile1: BasicProfile = new BasicProfile('123', 'Test 1', ['TestAffiliation']);
        const testProfile2: BasicProfile = new BasicProfile('456', 'Test 2', ['TestIndustries']);
        const testModel: SearchResultsModel = new SearchResultsModel([testProfile1, testProfile2]);
        const testFilter: AffiliationFilter = new AffiliationFilter();
        testFilter.value = 'Industries';
        testFilter.apply(testModel);
        expect(testModel.profiles.includes(testProfile1)).toBe(false);
        expect(testModel.profiles.includes(testProfile2)).toBe(true);
    });
});
