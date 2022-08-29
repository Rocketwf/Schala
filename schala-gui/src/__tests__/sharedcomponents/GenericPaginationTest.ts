import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import { ArticlesModel, ArticlesPaginationFilter, Pagination, ViewName } from 'schala-core';
import GenericPagination from '../../sharedcomponents/GenericPagination.vue';

installQuasarPlugin();

const paginationFilter: ArticlesPaginationFilter = new ArticlesPaginationFilter(3) as ArticlesPaginationFilter;
const artModel: ArticlesModel = new ArticlesModel([], 'Title', 'sub', ViewName.ArticlesCard, 5) as ArticlesModel;
const mockArticlesModel = new Pagination<ArticlesModel>(paginationFilter, artModel) as Pagination<ArticlesModel>;

describe('GenericPagination', () =>
{
    let wrapper: VueWrapper;
    beforeEach(() =>
    {
        wrapper = mount(GenericPagination, {
            props: {
                paginationModel: mockArticlesModel,
            },
        });
    });

    it('renders', () =>
    {
        expect(wrapper.exists()).toBe(true);
    });

    it('switches page correctly', () =>
    {
        const wrapper = mount(GenericPagination, {
            props: {
                paginationModel: mockArticlesModel,
            }
        });

        //wrapper.vm.switchPage;
        expect(wrapper.exists()).toBe(true);

    });
});
