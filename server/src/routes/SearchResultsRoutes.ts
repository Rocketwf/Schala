import express from 'express';
import { CommonRoutesConfig, EndPoints } from './CommonRoutesConfig';
import { SearchResultsService } from '../services/SearchResultsService';
import { ProfileService } from '../services/ProfileService';

export class SearchResultsRoutes extends CommonRoutesConfig {
    private searchResultsService: ProfileService = new SearchResultsService();

    constructor(app: express.Application) {
        super(app, 'SearchResultsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route('/' + EndPoints.SEARCHRESULTS + '/:query')
            .get((req: express.Request, res: express.Response) =>
                res.status(200).send(this.searchResultsService.build(`${req.params.query}`)),
            );
        return this.app;
    }
}
