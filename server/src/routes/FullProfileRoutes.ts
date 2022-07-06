import express from 'express';
import { CommonRoutesConfig, EndPoints } from './CommonRoutesConfig';
import { FullProfileService } from '../services/FullProfileService';
import { ProfileService } from '../services/ProfileService';

export class FullProfileRoutes extends CommonRoutesConfig {
    private fullProfileService: ProfileService = new FullProfileService();

    constructor(app: express.Application) {
        super(app, 'FullProfileRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route('/' + EndPoints.FULLPROFILE + '/:authorId')
            .get((req: express.Request, res: express.Response) =>
                res.status(200).send(this.fullProfileService.build(`${req.params.authorId}`)),
            );
        return this.app;
    }
}
