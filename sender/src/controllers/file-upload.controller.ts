import { Request, Response, NextFunction } from 'express';
import { fileUpload } from '../services/file-upload.service';

export async function upload(req: Request, res: Response, next: NextFunction) {
    try {
        const file: any = req.files?.file;
        const content = await fileUpload(file);
        res.json(content);
    } catch (err) {
        console.error(err);
        next(err);
    }
}