import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        await authService.createUser(req.body);
        res.json({ message: 'user created successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const token = await authService.login(req.body);
        res.json({ token: token });
    } catch (err) {
        console.error(err);
        next(err);
    }
}