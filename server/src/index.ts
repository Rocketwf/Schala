import express, { Request, Response, Application } from 'express';
import { CommonRoutesConfig } from './routes/CommonRoutesConfig';
import { FullProfileRoutes } from './routes/FullProfileRoutes';
import { SearchResultsRoutes } from './routes/SearchResultsRoutes';
import cors from 'cors';

/**
 * Express application.
 */
const app: Application = express();

/**
 * Represents the routes of the index as a list of CommonRoutesConfig.
 */
const routes: Array<CommonRoutesConfig> = [];

/**
 * Represents the port of the index as a number.
 */
const port: number = 3000;

app.use(cors());
routes.push(new SearchResultsRoutes(app));
routes.push(new FullProfileRoutes(app));

/**
 * Defines a route handler for the default home page.
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

/**
 * Starts the Express server.
 */
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
