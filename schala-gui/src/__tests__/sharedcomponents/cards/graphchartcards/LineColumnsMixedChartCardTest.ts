import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import LineColumnsMixedChartCard from '../../../../sharedcomponents/cards/graphchartcards/LineColumnsMixedChartCard.vue';
import { LineColumnsMixedChartModel, Series, ViewName } from 'schala-core';
import SimpleCard from '../../../../sharedcomponents/cards/SimpleCard.vue';

installQuasarPlugin();

const labels = ['label1', 'label2'];
const series: Series[] = [
    new Series('2020', [3, 5, 50]),
    new Series('2021', [5, 70]),
    new Series('2022', [20, 35]),
    new Series('2019', [10, 3, 6, 22, 14]),
];
const mockCardModel = new LineColumnsMixedChartModel('Title', '', ViewName.LineColumnsMixedChartCard, 10, series, 'x-title', 'y-title', labels);

describe('LineColumnsMixedChartCard', () =>
{
    let wrapper: VueWrapper<InstanceType<typeof LineColumnsMixedChartCard>>;
    beforeEach(() =>
    {
        wrapper = mount(LineColumnsMixedChartCard, {
            props: {
                cardModel: mockCardModel,
            }
        });
    });

    it('renders', () =>
    {
        expect(wrapper.exists()).toBe(true);
    });


    it('has correct attributes', () =>
    {
        const wrapper = mount(LineColumnsMixedChartCard, {
            props: {
                cardModel: mockCardModel,
            }
        });
        expect(wrapper.text()).toEqual('Title');

    });

    it('does simple card exist', () =>
    {
        const simpleCard = wrapper.findComponent(SimpleCard);
        expect(simpleCard.exists()).toBe(true);
    }) ;
});
