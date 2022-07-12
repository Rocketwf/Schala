import { BasicProfile } from '../../models/profile/BasicProfile';
import { SearchResultsService } from '../../services/SearchResultsService';


describe('Build according to a string', () =>
{
    it('Build Prakash and Zervakis profiles', async () => 
    {
        const srs: SearchResultsService= new SearchResultsService();
        const profileNames: Array<string> = ['Om Prakash','Georgios Zervakis'];
        for(const profileName in profileNames)
            (await srs.build(profileName)).forEach((element: BasicProfile) => 
            {
                expect(element.id != null && element.name != null).toBe(true);
            });
    }); 
});
