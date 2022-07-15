import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import StackedColumns100Chart from '../../../sharedcomponents/charts/StackedColumns100Chart.vue';
import { StackedColumns100ChartModel, Series, ViewName } from 'schala-core';
import VueApexCharts from "vue3-apexcharts";


installQuasarPlugin();

const testModel: StackedColumns100ChartModel = new StackedColumns100ChartModel(
    'Test Title',
    '',
    ViewName.StackedColumns100ChartCard,
    10,
    [new Series('Test Series', [1])],
    'xTitle',
    'yTitle',
    ['Test Label'],
)

describe('StackedColumns100Chart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(StackedColumns100Chart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                stackedColumns100ChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
