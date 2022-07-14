import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { comparePageStore } from '../../stores/comparePageStore';

describe('comparePageStore', () => 
{
    beforeEach(() => 
    {
        setActivePinia(createPinia());
    });

    afterEach(() => 
    {
        const store = comparePageStore();
        for (const profile of store.profileIds) 
        {
            store.removeProfile(profile);
        }
    });

    it('adds profile', async () => 
    {
        const store = comparePageStore();
        await store.addProfile('50481255');
        expect(store.profileIds).toContain('50481255');
    });

    it('removes available profile', async () => 
    {
        const store = comparePageStore();
        await store.addProfile('50481255');
        store.removeProfile('50481255');
        expect(store.profileIds).not.toContain('50481255');
    });

    it('removes not available profile', () => 
    {
        const store = comparePageStore();
        store.removeProfile('1679754');
        expect(store.profileIds.length).toEqual(0);
    });

    it('renders correct profile', async () => 
    {
        const store = comparePageStore();
        await store.addProfile('50481255');
        await store.renderSaved();
        expect(store.getComparisonRepresentation().fullProfiles[0].basicProfile.id).toEqual('50481255');
    });
    /*
    it('returns correct is being compared', async () => {
        const store = comparePageStore();
        await store.addProfile('1679754');
        await store.renderSaved();
        expect(store.isBeingCompared('1679754')).toEqual(true);
    })

    it('saves the same profile only once', () => {
        const store = comparePageStore();
        store.addProfile('1679754');
        store.addProfile('1679754');
        expect(store.profileIds.length).toEqual(1);
    })*/
});
