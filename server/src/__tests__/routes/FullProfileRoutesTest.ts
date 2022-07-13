import express, { Application } from 'express';
import { FullProfileRoutes } from '../../routes/FullProfileRoutes';

describe('FullProfileRoutes test', () => 
{
    it('config', () => 
    {
        const app: Application = express();
        const profile: FullProfileRoutes = new FullProfileRoutes(app);
        expect(profile.configureRoutes()).not.toBeNull();
    }, 30000);
});