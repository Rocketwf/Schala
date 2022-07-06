import { Application, Request, Response } from 'express';
import { CommonRoutesConfig, EndPoints } from './CommonRoutesConfig';
import { SearchResultsService } from '../services/SearchResultsService';
import { ProfileService } from '../services/ProfileService';

/**
 * Manages the search results routes of the given app.
 */
export class SearchResultsRoutes extends CommonRoutesConfig {
    /**
     * Service to get the search results
     */
    private searchResultsService: ProfileService = new SearchResultsService();

    /**
     * Constructs the SearchResultsRoutes.
     * @param app - app to configure
     */
    constructor(app: Application) {
        super(app, 'SearchResultsRoutes');
    }

    /**
     * Configures the routes of the given app.
     * @returns - application
     */
    configureRoutes(): Application {
        this.app
            .route('/' + EndPoints.SEARCHRESULTS + '/:query')
            .get((req: Request, res: Response) =>
                res.status(200).send(this.searchResultsService.build(req.params.query)),
            );
        return this.app;
    }
}
