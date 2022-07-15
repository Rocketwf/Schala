import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import DistributedColumnsChart from '../../../sharedcomponents/charts/DistributedColumnsChart.vue';
import { DistributedColumnsChartModel, Series, ViewName } from 'schala-core';
import VueApexCharts from 'vue3-apexcharts';


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

describe('DistributedColumnsChart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(DistributedColumnsChart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                distributedColumnsChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
