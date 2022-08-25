import { ComparisonRepresentation } from 'schala-core';
import {  describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import CompareContent from 'schala-gui/src/mainlayout/comparepage/CompareContent.vue';

installQuasarPlugin();

const comp = new ComparisonRepresentation([]);

describe('CompareContent', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = shallowMount(CompareContent, {
            props: {
                comparisonRepr: comp,
            }
        });
        expect(wrapper.vm.getComparisonRepresentation()).toBeTruthy();
        expect(wrapper).toBeTruthy();
    });
});
