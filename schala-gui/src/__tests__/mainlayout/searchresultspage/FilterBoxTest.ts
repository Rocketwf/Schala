import { beforeEach, describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import FilterBox from '../../../mainlayout/searchresultspage/FilterBox.vue';
import { setActivePinia, createPinia } from 'pinia';


installQuasarPlugin();

describe('Filter Box Tests', () => 
{
    beforeEach(() => 
    {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia());
    });
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(FilterBox);
        expect(wrapper).toBeTruthy();
    });
});
