import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import BasicBarsChart from '../../../sharedcomponents/charts/BasicBarsChart.vue';
import { BasicBarsChartModel, Series, ViewName } from 'schala-core';
import VueApexCharts from 'vue3-apexcharts';


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

describe('BasicBarsChart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(BasicBarsChart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                basicBarsChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
