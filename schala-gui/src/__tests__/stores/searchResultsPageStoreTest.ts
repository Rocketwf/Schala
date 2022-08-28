import { beforeEach, describe, expect, it } from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { BasicProfile } from 'schala-core';
import { searchResultsStore } from 'src/stores/searchResultsPageStore';

//const testFilter: AffiliationFilter = new AffiliationFilter('Test Filter');

describe('comparePageStore', () => 
{
    beforeEach(() => 
    {
        setActivePinia(createPinia());
    });
    it('sets profileRespresentation', () => 
    {
        const store = searchResultsStore();
        const testProfile: BasicProfile = new BasicProfile('123ABC', 'Walter F. Tichy', [], 0, 0, '', []);
        store.searchResultsModel.basicProfiles.push(testProfile);
        expect(store.searchResultsModel.basicProfiles).toMatchObject([testProfile]);
    });
    it('setWordsInTitleFilter works correctly', () => 
    {
        const store = searchResultsStore();
        store.searchResultsModel.basicProfiles.pop();
        const testProfile: BasicProfile = new BasicProfile('345XYZ', 'Joerg Henkel', [], 0, 0, '', []);
        store.searchResultsModel.basicProfiles.push(testProfile);
        store.setWordsInTitleFilter('Joerg');
        expect(store.searchResultsModel.basicProfiles).toMatchObject([testProfile]);
        store.setWordsInTitleFilter('Walter');
        expect(store.searchResultsModel.basicProfiles).toMatchObject([]);
    });
    it('setSearchString works correctly', async () => 
    {
        const store = searchResultsStore();
        store.setSearchString('Walter');
        expect(store.searchResultsModel.basicProfiles).toMatchObject([]);
    });
});
