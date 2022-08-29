import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import LineColumnsMixedChart from '../../../sharedcomponents/charts/LineColumnsMixedChart.vue';
import { LineColumnsMixedChartModel, Series, ViewName } from 'schala-core';
import VueApexCharts from 'vue3-apexcharts';


installQuasarPlugin();

const testModel: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
    'Test Title',
    '',
    ViewName.LineColumnsMixedChartCard,
    10,
    [new Series('Test Series', [1, 2]), new Series('Test Series', [3, 4])],
    'xTitle',
    'yTitle',
    ['Test Label'],
);

describe('LineColumnsMixedChart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(LineColumnsMixedChart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                lineColumnsMixedChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();

        //expect(wrapper.vm.getLabels).toMatchObject([]);

        //expect(wrapper.vm.getmaxLimitLine).toEqual(0);

        //expect(wrapper.vm.getmaxLimitColumn).toEqual(0);
    });
});
