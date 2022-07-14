import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mount, VueWrapper } from '@vue/test-utils';
import ExpertiseItem from '../../../sharedcomponents/cards/ExpertiseItem.vue';

installQuasarPlugin();

const exp = 'expertise';

describe('ExpertiseItem', () =>
{
    let wrapper: VueWrapper<any>;
    beforeEach(() =>
    {
        wrapper = mount(ExpertiseItem, {
            props: {
                expertise: exp,
            }
        });
    });

    it('renders', () =>
    {
        expect(wrapper.exists()).toBe(true);
    });
});
