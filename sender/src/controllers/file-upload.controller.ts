import { Request, Response, NextFunction } from 'express';
import { fileUpload } from '../services/file-upload.service';
import path from 'path';

export async function upload(req: Request, res: Response, next: NextFunction) {
    try {
        const file: any = req.files?.file;
        const path = file.path;
        // const extenstion: string = path.extname(path);
        // console.log(`extenstion: ${extenstion}`);
        await fileUpload(file);
        res.json({ message: 'file uploaded successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
}