import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import NavBar from '../../../mainlayout/header/NavBar.vue';

installQuasarPlugin();

describe('NavBar', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = mount(NavBar);

        expect(wrapper).toBeTruthy();
    });
});
