import express, { Request, Response, Application } from 'express';
import { CommonRoutesConfig } from './routes/CommonRoutesConfig';
import { FullProfileRoutes } from './routes/FullProfileRoutes';
import { SearchResultsRoutes } from './routes/SearchResultsRoutes';
import cors from 'cors';

const app: Application = express();
const routes: Array<CommonRoutesConfig> = [];
const port: number = 3000; // default port to listen
app.use(cors());

routes.push(new SearchResultsRoutes(app));
routes.push(new FullProfileRoutes(app));

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
