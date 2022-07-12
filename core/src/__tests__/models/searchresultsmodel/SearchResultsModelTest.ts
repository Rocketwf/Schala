import { SemanticScholarSource } from '../../../datasources';
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
    it('checks deepCopy works right', () => 
    {
        expect(searchResultsModel.deepCopy().basicProfiles).toEqual(basicProfiles);
    });
    it('checks amount of entry', () => 
    {
        expect(searchResultsModel.entries).toBe(3);
    });
});
