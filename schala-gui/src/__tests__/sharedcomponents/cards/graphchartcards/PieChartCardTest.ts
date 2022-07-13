import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import PieChartCard from '../../../../sharedcomponents/cards/graphchartcards/PieChartCard.vue';
import { PieChartModel, Series, ViewName } from 'schala-core';
import SimpleCard from '../../../../sharedcomponents/cards/SimpleCard.vue';

installQuasarPlugin();

const series: Series[] = [
    new Series('2020', [3, 5, 50]),
    new Series('2021', [5, 70]),
    new Series('2022', [20, 35]),
    new Series('2019', [10, 3, 6, 22, 14]),
];
const mockCardModel = new PieChartModel('Title', '', ViewName.PieChartCard, 10, series);

describe('PieChartCard', () =>
{
    let wrapper: VueWrapper<any>;
    beforeEach(() =>
    {
        wrapper = mount(PieChartCard, {
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
        const wrapper = mount(PieChartCard, {
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
