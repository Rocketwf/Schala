import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import ArticleItemButton from '../../../../sharedcomponents/buttons/articlebuttons/ArticleItemButton.vue';

installQuasarPlugin();

const string = 'article';

describe('ArticleItemButton', () =>
{
    let wrapper: VueWrapper;
    beforeEach(() =>
    {
        wrapper = mount(ArticleItemButton, {
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
