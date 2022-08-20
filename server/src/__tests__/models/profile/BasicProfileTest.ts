import { BasicProfile } from '../../../models/profile/BasicProfile';

const basicProfile :BasicProfile = new BasicProfile('123456','Om Prakash',['KIT'],42,11,'www.google.com');
describe('Basic Profile test', () =>
    it('test Basic Profile attributes', () => 
    {
        expect(basicProfile.affiliations[0] == 'KIT' && basicProfile.id == '123456' && basicProfile.name == 'Om Prakash' && 
        basicProfile.paperCount == 11 && basicProfile.totalCitations == 42 && basicProfile.pictureUrl == 'www.google.com').toBe(true);
    }
    )
);

describe('Basic Profile test', () =>
    it('test setting Basic Profile attributes', () => 
    {
        const tempBasicProfile :BasicProfile = basicProfile;
        tempBasicProfile.affiliations=[''];
        tempBasicProfile.id='';
        tempBasicProfile.name='';
        tempBasicProfile.paperCount=0;
        tempBasicProfile.totalCitations=0;
        tempBasicProfile.pictureUrl='';
        expect(tempBasicProfile.affiliations[0] == '' && tempBasicProfile.id == '' && tempBasicProfile.name == '' && 
        tempBasicProfile.paperCount == 0 && tempBasicProfile.totalCitations == 0 && tempBasicProfile.pictureUrl == '').toBe(true);
    }
    )
);