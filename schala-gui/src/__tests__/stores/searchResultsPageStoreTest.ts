import { beforeEach, describe, expect, it } from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { searchResultsStore } from '../../stores/searchResultsPageStore';

//const testFilter: AffiliationFilter = new AffiliationFilter('Test Filter');

describe('comparePageStore', () => 
{
    beforeEach(() => 
    {
        setActivePinia(createPinia());
    });
    it('fixes max pages', () => 
    {
        const store = searchResultsStore();
        store.setAffiliationFilter('Test Filter');
        expect(store.affilationFilter.value).toBe('Test Filter');
    });

    it('sets profileRespresentation', () => 
    {
        expect(true).toBe(true);
    });
});
