import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import MainLayout from '../../mainlayout/MainLayout.vue';
import { createTestingPinia } from '@pinia/testing';
import { RouterView } from 'vue-router';

installQuasarPlugin();

const wrapper = shallowMount(MainLayout, {
    global: {
        plugins: [createTestingPinia()],
        components: {
            'router-view': RouterView,
        },
    },
});

describe('MainLayout Test', () => 
{
    it('mounts without errors', () => 
    {
        expect(wrapper).toBeTruthy();
    });
});
