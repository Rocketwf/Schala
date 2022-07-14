import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import { BasicBarsChartModel, Field, Filter, ObjectSeriesChartModel, Series, ViewName } from 'schala-core';
import { ShowingFilter } from 'schala-core/dist/filters/objectserieschartfilters/ObjectSeriesFilter';
import { ShowingButton } from 'schala-core/dist/models/inputs/PopupEditButton';
import PopupButton from '../../../../sharedcomponents/buttons/popupedit/PopupButton.vue';

installQuasarPlugin();

const labels = ['label1', 'label2'];
const series: Series[] = [
    new Series('2020', [3, 5, 50]),
    new Series('2021', [5, 70]),
    new Series('2022', [20, 35]),
    new Series('2019', [10, 3, 6, 22, 14]),
];
const mockCardModel = new BasicBarsChartModel('Title', '', ViewName.BasicBarsChartCard, 10, series, 'x-title', 'y-title', labels);

const testFilter: Filter<number, ObjectSeriesChartModel> = new ShowingFilter(
    10,
);

const testField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
    'TestField',
    10,
    testFilter,
    [mockCardModel],
);

describe('PopupButton', () => 
{
    it('mounts without errors', () => 
    {
        const testButton = new ShowingButton('Test', [testField]);
        const wrapper = shallowMount(PopupButton, {
            props: {
                popupButtonModel: testButton,
            }
        });

        expect(wrapper).toBeTruthy();
    });
});

