import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import CiteButton from '../../../../sharedcomponents/buttons/articlebuttons/CiteButton.vue';

installQuasarPlugin();

describe('CiteButton', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(CiteButton, {
            props: {
                bibtex: 'Test Bibtex',
                buttonIcon: 'Test Icon'
            }
        });

        expect(wrapper).toBeTruthy();
    });
});
