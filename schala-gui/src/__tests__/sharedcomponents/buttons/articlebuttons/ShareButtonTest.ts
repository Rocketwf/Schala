import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
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

    it('opens window', () =>
    {
        const wrapper = mount(ShareButton, {
            props: {
                url: urlString,
                buttonIcon: iconString,
            }
        });

        wrapper.vm.share();
        expect(wrapper.exists()).toBe(true);
    });
});

