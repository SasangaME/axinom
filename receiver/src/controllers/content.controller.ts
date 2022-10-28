import { Request, Response, NextFunction } from 'express';
import * as contentService from '../services/content.service';

export async function receive(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await contentService.receive(req.body);
        res.json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await contentService.get();
        res.json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const id: string = req.params.id;
        const data = await contentService.getById(id);
        res.json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}