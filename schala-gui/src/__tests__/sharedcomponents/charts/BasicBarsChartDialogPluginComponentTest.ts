import BasicBarsChartDialogPluginComponent from '../../../sharedcomponents/charts/BasicBarsChartDialogPluginComponent.vue';
import { BasicBarsChartModel, Series, ViewName } from 'schala-core';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

installQuasarPlugin();

const testModel: BasicBarsChartModel = new BasicBarsChartModel(
    'Test Title',
    '',
    ViewName.BasicBarsChartCard,
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
        const wrapper = shallowMount(BasicBarsChartDialogPluginComponent, {
            props: {
                basicBarsChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
