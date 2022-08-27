import DistributedColumnsChartDialogPluginComponent from '../../../sharedcomponents/charts/DistributedColumnsChartDialogPluginComponent.vue';
import { DistributedColumnsChartModel, Series, ViewName } from 'schala-core';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

installQuasarPlugin();

const testModel: DistributedColumnsChartModel = new DistributedColumnsChartModel(
    'Test Title',
    '',
    ViewName.DistributedColumnsChartCard,
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
        const wrapper = shallowMount(DistributedColumnsChartDialogPluginComponent, {
            props: {
                distributedColumnsChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
