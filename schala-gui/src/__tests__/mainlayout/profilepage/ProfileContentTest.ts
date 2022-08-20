import { ProfileRepresentation, FullProfile, BasicProfile } from 'schala-core';
import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import ProfileContent from 'schala-gui/src/mainlayout/profilepage/ProfileContent.vue';

installQuasarPlugin();

const basic = new BasicProfile('id', 'name', [''], 12, 12, 'url');
const fullPr = new FullProfile(12, 11, 11, 11, 11, 11, 11, 'url', basic, [], [], [], [], [], []);
const comp = new ProfileRepresentation(fullPr);

describe('ProfileContent', () => 
{
    it('mounts without errors', () => 
    {
        const wrapper = shallowMount(ProfileContent, {
            props: {
                profileRepr: comp as ProfileRepresentation,
            },
        });

        expect(wrapper).toBeTruthy();
    });
});
