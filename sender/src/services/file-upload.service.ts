import path from 'path';
import AdmZip from 'adm-zip';

export async function fileUpload(file: any) {
    const fileName: string = file.name;
    const extenstion: string = path.extname(fileName);
    if (extenstion !== '.zip') {
        const err = {
            statusCode: 400,
            message: 'uploaded file is not a .zip'
        };
        throw err;
    }
    const filePath: string = `./uploads/${fileName}`;
    await file.mv(filePath);
    const extractName = fileName.replace('.zip', '');
    const extractPath = await unarchive(filePath, extractName);
}

async function unarchive(filePath: string, fileName: string): Promise<string> {
    const extractPath: string = `./extracted/${fileName}`;
    const zip = new AdmZip(filePath);
    await zip.extractAllTo(extractPath);
    return extractPath;
}

async function createContent() { }