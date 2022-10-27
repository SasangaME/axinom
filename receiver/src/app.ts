import express, { Application, Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';

config();

const app: Application = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const router = Router();
app.use(router);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ "message": "Receiver service is working" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

const port = parseInt(process.env.PORT || '3002');

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})
