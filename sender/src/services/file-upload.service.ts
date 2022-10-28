import path from 'path';
import AdmZip from 'adm-zip';
import { readdir, unlink } from 'fs';
import STATUS_CODES from '../constants/status-codes.constants';
import STATUS_MESSAGE from '../constants/status-messages.constants';
import { promisify } from 'util';
import { Content } from '../models/content.response';
import { sendToReceiver } from './receiver.service';

export async function fileUpload(file: any, token: string): Promise<Content> {
    const fileName: string = file.name;
    const extenstion: string = path.extname(fileName);
    if (extenstion !== '.zip') {
        const err = {
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: STATUS_MESSAGE.ZIP_FORMAT_ERROR
        };
        throw err;
    }
    const uploadBase: string = process.env.UPLOAD_LOCATION || './uploads';
    const filePath: string = `${uploadBase}/${fileName}`;
    await file.mv(filePath);
    const extractPath = await unarchive(filePath);
    await unlink(filePath, err => {
        if (err) {
            console.error(err);
        }
    });
    const content = await createContent(extractPath);
    const contentRes: Content = {
        fileName: fileName,
        contents: content,
        createdBy: 'Sasanga', // this is the system user
        createdDate: new Date(Date.now()).toJSON(),
        path: extractPath
    };
    await sendToReceiver(contentRes, token);
    return contentRes;
}

async function unarchive(filePath: string): Promise<string> {
    const readDir = promisify(readdir);
    const extractBase: string = process.env.EXTRACT_LOCATION || './extracted';
    const itemCount: number = (await readDir(extractBase)).length + 1 || 1;
    const extractPath: string = `${extractBase}/${itemCount}`;
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
