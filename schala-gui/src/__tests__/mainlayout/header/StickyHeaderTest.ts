import { jest, describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import StickyHeader from '../../../mainlayout/header/StickyHeader.vue';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));
const wrapper = shallowMount(StickyHeader, {
    global: {
        plugins: [createTestingPinia()],
    },
});

describe('StickyHeader Tests', () =>
{
    it('mounts without errors', () =>
    {
        expect(wrapper.vm.search()).toBeUndefined();
        expect(wrapper).toBeTruthy();
    });
});
