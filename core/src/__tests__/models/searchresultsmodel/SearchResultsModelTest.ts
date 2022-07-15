import { SemanticScholarSource } from '../../../datasources';
import { SearchResultsPaginationFilter } from '../../../filters';
import { BasicProfile, SearchResultsModel } from '../../../models';

describe('SearchResultsModel tests', () => 
{
    let basicProfiles: BasicProfile[];
    let searchResultsModel: SearchResultsModel;
    beforeEach(async () => 
    {
        basicProfiles = await SemanticScholarSource.getInstance().fetchSearchResults('walter+f+tichy');
        searchResultsModel = new SearchResultsModel(basicProfiles);
    }, 30000);
    it('checks if deepCopy works right', () => 
    {
        expect(searchResultsModel.deepCopy().basicProfiles).toEqual(basicProfiles);
    });
    it('checks amount of entry', () => 
    {
        expect(searchResultsModel.entries).toBe(3);
    });
    it('checks if getter and setter of filter works right', () => 
    {
        const paginationFilter: SearchResultsPaginationFilter = new SearchResultsPaginationFilter(1, 2);
        searchResultsModel.filters = [paginationFilter];
        expect(searchResultsModel.filters).toStrictEqual([paginationFilter]);
    });
    it('checks if getter and setter of expandable works right', () => 
    {
        searchResultsModel.expandable = true;
        expect(searchResultsModel.expandable).toBe(true);
    });
});
