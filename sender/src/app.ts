import express, { Application, Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';
import upload from 'express-fileupload';
import { fileRouter } from './routes/file.upload.route';

config();

const app: Application = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileSize: number = parseInt(process.env.FILE_SIZE || '2'); // in MB
app.use(upload({
    limits: { fileSize: fileSize * 1024 * 1024 }
}));

export const router = Router();
router.use('/api/v1/file', fileRouter);
app.use(router);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ "message": "Sender service is working" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});


const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})

