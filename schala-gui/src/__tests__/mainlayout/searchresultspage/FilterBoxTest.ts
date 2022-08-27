import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import FilterBox from '../../../mainlayout/searchresultspage/FilterBox.vue';
import { createTestingPinia } from '@pinia/testing';
import { ref } from 'vue';
import { StudyFieldsFilter } from 'schala-core';

installQuasarPlugin();

describe('Filter Box Tests', () =>
{
    it('mounts without errors', () =>
    {
        const filter = new StudyFieldsFilter(['a']);
        const text = ref(filter.value);
        const wrapper = shallowMount(FilterBox, {
            global: {
                plugins: [
                    createTestingPinia(),
                ],
            },
            attrs: {
                filterString: text,
            }
        });
        expect(wrapper).toBeTruthy();
        //expect(wrapper.vm.getFilterString()).toBeDefined();
        //expect(wrapper.vm.handleFilter()).toBeUndefined();
        //expect(wrapper.vm.removeFilter()).toBeUndefined();
    });
});
