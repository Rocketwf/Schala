
import {  describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import App from 'schala-gui/src/App.vue';

installQuasarPlugin();

describe('App', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = shallowMount(App, {
        });

        expect(wrapper).toBeTruthy();
    });
});
