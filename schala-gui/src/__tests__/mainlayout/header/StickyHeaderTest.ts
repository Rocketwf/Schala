import { jest, describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import StickyHeader from '../../../mainlayout/header/StickyHeader.vue';
import { createTestingPinia } from '@pinia/testing';
import { Router, useRouter } from 'vue-router';
import { ref } from 'vue';

installQuasarPlugin();

const routerPushMock = jest.fn();
const router: Router = useRouter();
const text = ref('');

jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));
const wrapper = shallowMount(StickyHeader, {
    global: {
        plugins: [createTestingPinia()],
    },
    attrs: {
        router: router,
        text:text
    }
});

describe('StickyHeader Tests', () =>
{
    it('mounts without errors', () =>
    {
        expect(wrapper).toBeTruthy();
    });
});
