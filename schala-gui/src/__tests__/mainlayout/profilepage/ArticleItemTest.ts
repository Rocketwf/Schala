import { Article } from 'schala-core';
import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import ArticleItem from 'schala-gui/src/mainlayout/profilepage/ArticleItem.vue';

installQuasarPlugin();

const art = new Article('title', 'venue', 2000, 12, 13, 'url', [], 'abstract', '', '', '', ['']);

describe('ArticleItem', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = shallowMount(ArticleItem, {
            props: {
                article: art,
            }
        });
        expect(wrapper).toBeTruthy();
    });
});
