import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import ErrorNotFound from '../../pages/ErrorNotFound.vue';

installQuasarPlugin();

describe('ErrorNotFound', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = mount(ErrorNotFound);

        expect(wrapper).toBeTruthy();
    });
});
