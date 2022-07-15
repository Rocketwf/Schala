import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import { ArticlesModel, ViewName } from 'schala-core';
import ExperimentalGenericPagination from '../../sharedcomponents/ExperimentalGenericPagination.vue';

installQuasarPlugin();

const mockArticlesModel = new ArticlesModel([], 'Title', 'sub', ViewName.ArticlesCard, 5);

describe('ExperimentalGenericPagination', () =>
{
    let wrapper: VueWrapper;
    beforeEach(() =>
    {
        wrapper = mount(ExperimentalGenericPagination, {
            props: {
                paginationModel: [mockArticlesModel],
            }
        });
    });

    it('renders', () =>
    {
        expect(wrapper.exists()).toBe(true);
    });
});
