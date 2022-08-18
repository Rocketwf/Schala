import express, { Application } from 'express';
import { SearchResultsRoutes } from '../../routes/SearchResultsRoutes';


describe('SearchResultsRoutes test', () => 
{
    it('checks length of configureRoutes and get/set name', async () => 
    {
        const app: Application = express();
        const profile: SearchResultsRoutes = new SearchResultsRoutes(app);
        profile.name = 'search';
        expect(profile.configureRoutes().length > 0 && profile.name == 'search').toBe(true);
    }, 30000);
});