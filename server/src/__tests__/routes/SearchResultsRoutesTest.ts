import express, { Application } from 'express';
import { SearchResultsRoutes } from '../../routes/SearchResultsRoutes';


describe('SearchResultsRoutes test', () => 
{
    it('config', () => 
    {
        const app: Application = express();
        const profile: SearchResultsRoutes = new SearchResultsRoutes(app);
        expect(profile.configureRoutes()).not.toBeNull();
    }, 30000);
});