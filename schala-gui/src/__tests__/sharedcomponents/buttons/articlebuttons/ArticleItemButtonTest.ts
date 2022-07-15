import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import ArticleItemButton from '../../../../sharedcomponents/buttons/articlebuttons/ArticleItemButton.vue';

installQuasarPlugin();

const string = 'article';

describe('ArticleItemButton', () =>
{
    let wrapper: VueWrapper;
    beforeEach(() =>
    {
        wrapper = shallowMount(ArticleItemButton, {
            props: {
                icon: string,
            }
        });
    });

    it('renders', () =>
    {
        expect(wrapper.exists()).toBe(true);
    });
});
