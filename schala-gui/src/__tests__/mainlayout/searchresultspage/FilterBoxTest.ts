import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import FilterBox from '../../../mainlayout/searchresultspage/FilterBox.vue';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

describe('Filter Box Tests', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = shallowMount(FilterBox, {
            global: {
                plugins: [
                    createTestingPinia(),
                ],
            },
        });
        expect(wrapper).toBeTruthy();
        expect(wrapper.vm.getFilterString()).toBeDefined();
        expect(wrapper.vm.handleFilter()).toBeUndefined();
        expect(wrapper.vm.removeFilter()).toBeUndefined();
    });
});
