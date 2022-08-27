import StackedColumnsChartDialogPluginComponent from '../../../sharedcomponents/charts/StackedColumnsChartDialogPluginComponent.vue';
import { Series, StackedColumnsChartModel, ViewName } from 'schala-core';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

installQuasarPlugin();

const testModel: StackedColumnsChartModel = new StackedColumnsChartModel(
    'Test Title',
    '',
    ViewName.StackedColumnsChartCard,
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
        const wrapper = shallowMount(StackedColumnsChartDialogPluginComponent, {
            props: {
                stackedColumnsMixedChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
