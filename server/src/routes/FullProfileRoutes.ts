import { Application, Request, Response } from 'express';
import { CommonRoutesConfig, EndPoints } from './CommonRoutesConfig';
import { FullProfileService } from '../services/FullProfileService';
import { ProfileService } from '../services/ProfileService';
import { FullProfile } from '../models/profile/FullProfile';

/**
 * Manages the full profile routes of the given app.
 */
export class FullProfileRoutes extends CommonRoutesConfig {
    /**
     * Service to get the full profile
     */
    private fullProfileService: ProfileService = new FullProfileService();

    /**
     * Constructs the FullProfileRoutes.
     * @param app - app to configure
     */
    constructor(app: Application) {
        super(app, 'FullProfileRoutes');
    }

    /**
     * Configures the routes of the given app.
     * @returns - application
     */
    configureRoutes(): Application {
        this.app.route('/' + EndPoints.FULLPROFILE + '/:authorId').get(async (req: Request, res: Response) => {
            const built: FullProfile[] = await new FullProfileService().build(req.params.authorId);
            res.status(200).send(built[0]);
        });
        return this.app;
    }
}
