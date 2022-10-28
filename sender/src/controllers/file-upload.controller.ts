import { Request, Response, NextFunction } from 'express';
import { fileUpload } from '../services/file-upload.service';
import STATUS_CODES from '../constants/status-codes.constants';
import STATUS_MESSAGE from '../constants/status-messages.constants';

export async function upload(req: Request, res: Response, next: NextFunction) {
    try {
        const file: any = req.files?.file;
        if (file === null) {
            const err = {
                statusCode: STATUS_CODES.BAD_REQUEST,
                message: STATUS_MESSAGE.ZIP_FORMAT_ERROR
            };
            throw err;
        }
        const token: string = req.headers?.authorization?.split(' ')[1] || '';
        if (token.length === 0) {
            const err = {
                statusCode: STATUS_CODES.BAD_REQUEST,
                message: STATUS_MESSAGE.TOKEN_NOT_FOUND
            }
            throw err;
        }
        const content = await fileUpload(file, token);
        res.json(content);
    } catch (err) {
        console.error(err);
        next(err);
    }
}