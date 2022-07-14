import { FullProfile } from '../../models/profile/FullProfile';
import { FullProfileService } from '../../services/FullProfileService';

describe('findOrCreate method', () => 
{
    let service: FullProfileService;
    let profiles: FullProfile[];
    beforeEach(async () => 
    {
        service = new FullProfileService();
        profiles = await service.build('1679754');
    }, 50000);
    
    it('builds a fullprofile', async () => 
    {
        expect(profiles.length == 1).toBe(true);
    }, 50000);
    it('checks if the name is correct', async () => 
    {
        expect(profiles[0].basicProfile.name).toBe('Walter F Tichy');
    }, 50000);
    

});