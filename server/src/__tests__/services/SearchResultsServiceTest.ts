import { BasicProfile } from '../../models/profile/BasicProfile';
import { SearchResultsService } from '../../services/SearchResultsService';
describe('Search according to a string', () =>
{
    it('Seach for Zervakis basic profile', async () => 
    {
        const srs: SearchResultsService= new SearchResultsService();
        const profileName: string = 'Georgios Zervakis';
        let profileIsPresent: boolean = false;
        (await srs.build(profileName)).forEach((element:BasicProfile) => 
        {
            if(element.id == '50481255')
            {
                profileIsPresent =true;
            }         
        });
        expect(profileIsPresent).toBe(true);
        profileIsPresent=false;
    }); 
});
