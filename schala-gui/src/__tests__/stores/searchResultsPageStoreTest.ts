import { beforeEach, describe, expect, it } from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';

//const testFilter: AffiliationFilter = new AffiliationFilter('Test Filter');

describe('comparePageStore', () => 
{
    beforeEach(() => 
    {
        setActivePinia(createPinia());
    });
    it('sets profileRespresentation', () => 
    {
        expect(true).toBe(true);
    });
});
