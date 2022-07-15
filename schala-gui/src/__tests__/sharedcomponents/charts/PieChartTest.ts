import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import PieChart from '../../../sharedcomponents/charts/PieChart.vue';
import { PieChartModel, Series, ViewName } from 'schala-core';
import VueApexCharts from 'vue3-apexcharts';


installQuasarPlugin();

const testModel: PieChartModel = new PieChartModel(
    'Test Title',
    '',
    ViewName.PieChartCard,
    10,
    [new Series('Test Series', [1])],
);

describe('PieChart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(PieChart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                pieChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
