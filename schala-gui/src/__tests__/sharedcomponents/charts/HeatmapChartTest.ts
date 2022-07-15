import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import HeatmapChart from '../../../sharedcomponents/charts/HeatmapChart.vue';
import { Series, ViewName, HeatmapChartModel } from 'schala-core';
import VueApexCharts from "vue3-apexcharts";


installQuasarPlugin();

const testModel: HeatmapChartModel = new HeatmapChartModel(
    'Test Title',
    '',
    ViewName.HeatmapChartCard,
    10,
    [new Series('Test Series', [1])],
)

describe('HeatmapChart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(HeatmapChart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                heatmapChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
