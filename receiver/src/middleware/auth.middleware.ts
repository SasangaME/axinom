import { Request, Response, NextFunction } from 'express';
import STATUS_CODE from '../constants/status-codes.constant';
import STATUS_MESSAGE from '../constants/status-messages.constant';
import { verify } from '../utils/jwt.util';


export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers?.authorization?.split(' ')[1] || '';
        if (token.length === 0) {
            const err = {
                statusCode: STATUS_CODE.UNAUTHORIZED,
                message: STATUS_MESSAGE.TOKEN_NOT_FOUND
            }
            throw err;
        }

        const tokenVerified: boolean = verify(token);
        if (!tokenVerified) {
            const err = {
                statusCode: STATUS_CODE.UNAUTHORIZED,
                message: STATUS_MESSAGE.INVALID_TOKEN
            }
            throw err;
        }

        next();
    } catch (err) {
        next(err);
    }
}