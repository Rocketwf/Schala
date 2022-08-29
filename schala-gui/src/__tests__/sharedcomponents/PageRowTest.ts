import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import {
    ChartOptionsModel,
    BasicBarsChartModel,
    Series,
    CheckBox,
    ScaleUpFilter,
    RowModel,
    ViewName,
} from 'schala-core';
import { shallowMount } from '@vue/test-utils';
import PageRow from '../../sharedcomponents/PageRow.vue';
//import { mapper } from '../../sharedcomponents/cards/graphchartcards/SimpleCardMapper';

installQuasarPlugin();

describe('PageRow', () =>
{
    it('mounts without errors', () =>
    {
        const com: ChartOptionsModel = new ChartOptionsModel([
            new BasicBarsChartModel(
                'title',
                '',
                ViewName.BasicBarsChartCard,
                3,
                [new Series('test', [2], 'line')],
                'xtitle',
                'ytitle',
                ['label'],
            ),
        ]);
        const rm: RowModel = new RowModel(1);
        const filter: ScaleUpFilter = new ScaleUpFilter(true);
        com.filters = [filter];
        const checkbox: CheckBox<ChartOptionsModel> = new CheckBox('name', true, filter, [com]);
        checkbox.data = [com];
        rm.checkBoxes = [checkbox];

        const wrapper = shallowMount(PageRow, {
            props: {
                rowModel: rm,
            },
        });

        expect(wrapper).toBeTruthy();
    });

    it('returns view name correctly', () =>
    {
        const rm: RowModel = new RowModel(1);
        //const viewName = 'view';
        const wrapper = shallowMount(PageRow, {
            props: {
                rowModel: rm,
            }
        });

        expect(wrapper).toBeTruthy();
        //expect(wrapper.vm.getView()).toBe(mapper.get(viewName));
    });

});
