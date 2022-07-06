import express, { Request, Response, Application } from 'express';
import cors from 'cors';
const app: Application = express();
const port: number = 3000; // default port to listen
app.use(cors());

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
