import { Application } from 'express';
import { SearchResultsRoutes } from '../../routes/SearchResultsRoutes';


describe('SearchResultsRoutes test', () => 
{
    it('config', () => 
    {
        let app: Application ;
        const profile: SearchResultsRoutes = new SearchResultsRoutes(app);
        expect(profile.configureRoutes()).toBeNull();
    }, 30000);
});