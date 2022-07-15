import { jest, describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import {
    BasicProfile,
    FullProfile,
    CitationByYear,
    CitedScholar,
    PublicationByVenue,
    PublicationByYear,
    ProfileExpertise
} from 'schala-core';

import ProfileSummary from '../../../../schala-gui/src/sharedcomponents/ProfileSummary.vue';

installQuasarPlugin();

const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));

const testProfile = new FullProfile(
    [new ProfileExpertise('a', 2), new ProfileExpertise('b', 3), new ProfileExpertise('c', 4)],
    1000,
    1001,
    2000,
    2001,
    3000,
    3001,
    4000,
    '4001',
    new BasicProfile('100', 'Test Person', [], 50, 51),
    [new PublicationByYear(2022, 10)],
    [new PublicationByVenue('KIT', 11)],
    [new CitationByYear(2022, 20, 21, 22)],
    [new CitedScholar('Cited Test Person', 9)],
    [],
    [],
);

describe('ExpertiseCard', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(ProfileSummary, {
            props: {
                profile: testProfile,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
