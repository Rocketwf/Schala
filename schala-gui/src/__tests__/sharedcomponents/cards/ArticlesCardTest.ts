import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
installQuasarPlugin();
import { shallowMount } from '@vue/test-utils';
import { ArticlesModel, Article, ViewName, ArticlesPaginationFilter } from 'schala-core';
import ArticlesCard from '../../../sharedcomponents/cards/ArticlesCard.vue';

const article = new Article('title', 'venue', 2000, 12, 'url', [], 'abstract');
const articlesModel = new ArticlesModel([article], 'title', 'sub', ViewName.ArticlesCard, 5);
articlesModel.paginationFilter = new ArticlesPaginationFilter(10);

describe('ArticlesCard', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = shallowMount(ArticlesCard, {
            props: {
                cardModel : articlesModel,
            }
        });

        expect(wrapper).toBeTruthy();
    });
});
