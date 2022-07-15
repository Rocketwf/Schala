import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import { ViewName, ExpertiseModel, Expertise, ProfileExpertise } from 'schala-core';

import SimpleCard from '../../../../src/sharedcomponents/cards/SimpleCard.vue';
import ExpertiseCard from '../../../../src/sharedcomponents/cards/ExpertiseCard.vue';

installQuasarPlugin();


describe('ExpertiseCard', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(SimpleCard, {
            props: {
                simpleCardModel: new ExpertiseModel(
                    [new Expertise('Test Expertise', [new ProfileExpertise('a', 2), new ProfileExpertise('b', 3), new ProfileExpertise('c', 4)],)],
                    'Test Title',
                    '',
                    ViewName.ExpertiseCard,
                    1,
                ),
            },
            slots: {
                model: ExpertiseCard
            }
        });

        expect(wrapper).toBeTruthy();
    });
});

