import express, { Application } from 'express';
import { SearchResultsRoutes } from '../../routes/SearchResultsRoutes';


describe('SearchResultsRoutes test', () => 
{
    it('checks length of configureRoutes', () => 
    {
        const app: Application = express();
        const profile: SearchResultsRoutes = new SearchResultsRoutes(app);
        expect(profile.configureRoutes().length > 0).toBe(true);
    }, 30000);
});