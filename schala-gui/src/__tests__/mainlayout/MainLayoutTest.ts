import { jest, describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import MainLayout from '../../mainlayout/MainLayout.vue';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));
const wrapper = shallowMount(MainLayout, {
    global: {
        plugins: [createTestingPinia()],
    },
});

describe('MainLayout Test', () =>
{
    it('mounts without errors', () =>
    {
        expect(wrapper).toBeTruthy();
    });

});
