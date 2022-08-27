import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import ShareButton from '../../../../sharedcomponents/buttons/articlebuttons/ShareButton.vue';

installQuasarPlugin();

const urlString = 'url';
const iconString = 'icon';

describe('ShareButton', () =>
{
    it('renders', () =>
    {   
        const wrapper = mount(ShareButton, {
            props: {
                url: urlString,
                buttonIcon: iconString,
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});

