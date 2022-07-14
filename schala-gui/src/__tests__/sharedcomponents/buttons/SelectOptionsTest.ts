import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import { ArticlesModel, ViewName } from 'schala-core';
import SelectOptions from '../../../sharedcomponents/buttons/SelectOptions.vue';

installQuasarPlugin();

const mockArticlesModel = new ArticlesModel([], 'Title', 'sub', ViewName.ArticlesCard, 5);

describe('SelectOptions', () =>
{
    let wrapper: VueWrapper<any>;
    beforeEach(() =>
    {
        wrapper = mount(SelectOptions, {
            props: {
                selectOptionsModels: [mockArticlesModel],
            }
        });
    });

    it('renders', () =>
    {
        expect(wrapper.exists()).toBe(true);
    });
});
