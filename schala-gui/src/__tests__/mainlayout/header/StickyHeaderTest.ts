import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import StickyHeader from '../../../mainlayout/header/StickyHeader.vue';
import { createTestingPinia } from '@pinia/testing';
import { searchResultsStore } from '../../../stores/searchResultsPageStore';

installQuasarPlugin();

const wrapper = shallowMount(StickyHeader, {
    global: {
        plugins: [createTestingPinia()],
    },
});

const store = searchResultsStore();

describe('StickyHeader Tests', () =>
{
    it('mounts without errors', () =>
    {
        expect(wrapper).toBeTruthy();
    });
});
