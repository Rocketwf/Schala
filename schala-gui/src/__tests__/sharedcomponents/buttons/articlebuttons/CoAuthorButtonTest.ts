import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import { ArticleCoAuthor } from 'schala-core';
import CoAuthorButton from '../../../../sharedcomponents/buttons/articlebuttons/CoAuthorButton.vue';

installQuasarPlugin();

describe('CoAuthorButton', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(CoAuthorButton, {
            props: {
                coAuthors: [new ArticleCoAuthor('TestID', 'TestAuthor')],
                buttonIcon: 'Test Icon',
            }
        });

        expect(wrapper).toBeTruthy();
    });
});

