import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import BasicColumnsChart from '../../../sharedcomponents/charts/BasicColumnsChart.vue';
import { BasicColumnsChartModel, Series, ViewName } from 'schala-core';
import VueApexCharts from "vue3-apexcharts";


installQuasarPlugin();

const testModel: BasicColumnsChartModel = new BasicColumnsChartModel(
    'Test Title',
    '',
    ViewName.BasicColumnsChartCard,
    10,
    [new Series('Test Series', [1])],
    'xTitle',
    'yTitle',
    ['Test Label'],
)

describe('BasicColumnsChart', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(BasicColumnsChart, {
            global: {
                components: {
                    'apexchart': VueApexCharts,
                }
            },
            props: {
                basicColumnsChartModel: testModel,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
