import { jest, describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import SearchComponent from '../../../nolayout/homepage/SearchComponent.vue';

installQuasarPlugin();

const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));

describe('SearchComponent', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = mount(SearchComponent);

        expect(wrapper).toBeTruthy();
    });
});
