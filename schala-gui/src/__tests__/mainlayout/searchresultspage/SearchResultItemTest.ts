import { jest, describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import SearchResultItem from '../../../mainlayout/searchresultspage/SearchResultItem.vue';
import { createTestingPinia } from '@pinia/testing';
import { profilePageStore } from '../../../stores/profilePageStore';
import {
    CitationByYear,
    CitedScholar,
    PublicationByVenue,
    PublicationByYear,
    BasicProfile,
    FullProfile,
    ProfileRepresentation,
} from 'schala-core';
installQuasarPlugin();
const routerPushMock = jest.fn();

jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));
const wrapper = shallowMount(SearchResultItem, {
    global: {
        plugins: [
            createTestingPinia({
                initialState: {
                    profilePageStore: { profileId: 1 },
                },
            }),
        ],
    },
    props: {
        profile: new BasicProfile('10'),
    },
});

const profileStore = profilePageStore();
profilePageStore.$id = 'profilePage';
profileStore.profileRepresentation = new ProfileRepresentation(
    new FullProfile(
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
    ),
);
//const searchStore = searchResultsStore();

describe('TestX', () => 
{
    it('mounts without errors', () => 
    {
        expect(wrapper).toBeTruthy();
    });
});
