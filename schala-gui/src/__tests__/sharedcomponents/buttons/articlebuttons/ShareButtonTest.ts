import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import ShareButton from '../../../../sharedcomponents/buttons/articlebuttons/ShareButton.vue';

installQuasarPlugin();

const urlString = 'url';
const iconString = 'icon';

describe('ShareButton', () =>
{
    let wrapper: VueWrapper<any>;
    beforeEach(() =>
    {
        wrapper = mount(ShareButton, {
            props: {
                url: urlString,
                buttonIcon: iconString,
            }
        });
    });

    it('renders', () =>
    {
        expect(wrapper.exists()).toBe(true);
    });
});

