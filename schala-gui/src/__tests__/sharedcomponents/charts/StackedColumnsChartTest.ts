import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import StackedColumnsChart from '../../../sharedcomponents/charts/StackedColumnsChart.vue';
import { StackedColumnsChartModel, Series, ViewName } from 'schala-core';
import VueApexCharts from "vue3-apexcharts";


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
)

describe('StackedColumnsChart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(StackedColumnsChart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                stackedColumnsChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
