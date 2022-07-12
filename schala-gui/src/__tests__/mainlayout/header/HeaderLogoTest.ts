import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import HeaderLogo from '../../../mainlayout/header/HeaderLogo.vue';

installQuasarPlugin();

describe('HeaderLogo', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = mount(HeaderLogo);

        expect(wrapper).toBeTruthy();
    });
});

