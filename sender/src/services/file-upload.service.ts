import path from 'path';
import AdmZip from 'adm-zip';
import { readdir, unlink } from 'fs';
import STATUS_CODES from '../constants/status-codes.constants';
import ErrorMessages from '../constants/error-messages.constants';
import { promisify } from 'util';
import { Content } from '../models/content.response';
import { sendToReceiver } from './receiver.service';

export async function fileUpload(file: any): Promise<Content> {
    const fileName: string = file.name;
    const extenstion: string = path.extname(fileName);
    if (extenstion !== '.zip') {
        const err = {
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: ErrorMessages.ZIP_FORMAT_ERROR
        };
        throw err;
    }
    const filePath: string = `./uploads/${fileName}`;
    await file.mv(filePath);
    const extractPath = await unarchive(filePath);
    await unlink(filePath, err => {
        if (err) {
            console.error(err);
        }
    });
    const content = await createContent(extractPath);
    const contentRes: Content = {
        contents: content,
        createdBy: 'Sasanga',
        createdDate: new Date(Date.now()).toJSON(),
        path: extractPath
    };
    await sendToReceiver(contentRes);
    return contentRes;
}

async function unarchive(filePath: string): Promise<string> {
    const readDir = promisify(readdir);
    const itemCount: number = (await readDir('./extracted')).length + 1 || 1;
    const extractPath: string = `./extracted/${itemCount}`;
    const zip = new AdmZip(filePath);
    await zip.extractAllTo(extractPath);
    return extractPath;
}

async function createContent(folderPath: string): Promise<string[]> {
    const readDir = promisify(readdir);
    const content: string[] = await readDir(folderPath);
    const removeIndex: number = content.findIndex(item => item === '__MACOSX');
    if (removeIndex > -1) {
        content.splice(removeIndex, 1);
    }
    return content;
}
