import { Request, Response, NextFunction } from 'express';
import { fileReceive } from '../services/file-receiver.service';

export async function receive(req: Request, res: Response, next: NextFunction) {
    try {
        await fileReceive(req.body);
        res.json({ message: 'content received' });
    } catch (err) {
        console.error(err);
        next(err);
    }
}