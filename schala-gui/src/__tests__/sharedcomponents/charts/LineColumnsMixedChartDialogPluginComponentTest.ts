import LineColumnsMixedChartDialogPluginComponent from '../../../sharedcomponents/charts/LineColumnsMixedChartDialogPluginComponent.vue';
import {  LineColumnsMixedChartModel, Series, ViewName } from 'schala-core';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

installQuasarPlugin();

const testModel: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
    'Test Title',
    '',
    ViewName.LineColumnsMixedChartCard,
    10,
    [new Series('Test Series', [1])],
    'xTitle',
    'yTitle',
    ['Test Label'],
);



describe('dialogComponent', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(LineColumnsMixedChartDialogPluginComponent, {
            props: {
                lineColumnsMixedChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
