
import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import SearchBox from 'schala-gui/src/mainlayout/header/SearchBox.vue';

installQuasarPlugin();

describe('SearchBox', () =>
{
    it('mounts without errors', () =>
    {

        const wrapper = shallowMount(SearchBox, {
            attrs: {
                searchString: '',
            }
        });
        expect(wrapper).toBeTruthy();
    });
});
