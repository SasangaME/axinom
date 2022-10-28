import { Request, Response, NextFunction } from 'express';
import { contentReceive, getContent } from '../services/content.service';

export async function receive(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await contentReceive(req.body);
        res.json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await getContent();
        res.json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}