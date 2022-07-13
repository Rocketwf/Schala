import { Application } from 'express';
import { FullProfileRoutes } from '../../routes/FullProfileRoutes';

describe('FullProfileRoutes test', () => 
{
    it('config', () => 
    {
        let app: Application ;
        const profile: FullProfileRoutes = new FullProfileRoutes(app);
        expect(profile.configureRoutes()).toBeNull();
    }, 30000);
});