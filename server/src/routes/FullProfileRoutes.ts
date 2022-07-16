import { Application, Request, Response } from 'express';
import { CommonRoutesConfig, EndPoints } from './CommonRoutesConfig';
import { FullProfileService } from '../services/FullProfileService';
import { FullProfile } from '../models/profile/FullProfile';

/**
 * Manages the full profile routes of the given app.
 */
export class FullProfileRoutes extends CommonRoutesConfig 
{
    /**
     * Service to get the full profile
     */
    private fullProfileService: FullProfileService = new FullProfileService();

    /**
     * Constructs the FullProfileRoutes.
     * @param app - app to configure
     */
    constructor(app: Application) 
    {
        super(app, 'FullProfileRoutes');
    }

    /**
     * Configures the routes of the given app.
     * @returns - application
     */
    configureRoutes(): Application 
    {
        this.app.route('/' + EndPoints.FULLPROFILE + '/:authorId').get(async (req: Request, res: Response) => 
        {
            try 
            {
                const built: FullProfile[] = await this.fullProfileService.build(req.params.authorId);
                res.status(200).send(built[0]);
            }
            catch (e) 
            {
                res.status(404).send('profile with given id was not found');
            }
        });
        return this.app;
    }
}
