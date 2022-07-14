import express, { Application } from 'express';
import { FullProfileRoutes } from '../../routes/FullProfileRoutes';

describe('FullProfileRoutes test', () => 
{
    it('checks length of configureRoutes', () => 
    {
        const app: Application = express();
        const profile: FullProfileRoutes = new FullProfileRoutes(app);
        expect(profile.configureRoutes().length > 0).toBe(true);
        
    }, 30000);
});