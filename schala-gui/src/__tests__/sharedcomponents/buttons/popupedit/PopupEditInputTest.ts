import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
installQuasarPlugin();
import { shallowMount } from '@vue/test-utils';
import { ShowingFilter, DistributedColumnsChartModel, Field, Series, ViewName } from 'schala-core';
import PopupEditInput from '../../../../../../schala-gui/src/sharedcomponents/buttons/popupedit/PopupEditInput.vue';



const testModel = new DistributedColumnsChartModel(
    'Test Model',
    '',
    ViewName.DistributedColumnsChartCard,
    1,
    [new Series('Test Series', [0])],
    'Test X Title',
    'Test Y Title',
    ['Test Label'],
);

const testField = new Field<number, DistributedColumnsChartModel>(
    'Test Field',
    0,
    new ShowingFilter(1),
    [testModel],
);

describe('PopupEditInput', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(PopupEditInput, {
            props: {
                textField: testField,
                models: [testModel],
            }
        });

        expect(wrapper).toBeTruthy();
    });
});

