import express from 'express';
import { CommonRoutesConfig, EndPoints } from './CommonRoutesConfig';
import { FullProfileService } from '../services/FullProfileService';
import { ProfileService } from '../services/ProfileService';

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
    constructor(app: express.Application) {
        super(app, 'FullProfileRoutes');
    }

    /**
     * Configures the routes of the given app.
     * @returns - application
     */
    configureRoutes(): express.Application {
        this.app
            .route('/' + EndPoints.FULLPROFILE + '/:authorId')
            .get((req: express.Request, res: express.Response) =>
                res.status(200).send(this.fullProfileService.build(`${req.params.authorId}`)),
            );
        return this.app;
    }
}
