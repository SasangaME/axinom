import { ContentRequest } from "../models/dto/content.model";
import { Content } from '../models/schema/content.schema';

export async function receive(content: ContentRequest) {
    console.log('receiver called');
    const data = new Content({
        fileName: content.fileName,
        path: content.path,
        contents: content.contents,
        createdBy: content.createdBy,
        createdDate: content.createdDate
    });
    const result = await data.save();
    return result;
}

export async function get(): Promise<ContentRequest[]> {
    const data = await Content.find();
    return data;
}

export async function getById(id: string) {
    const data = await Content.findById(id);
    return data;
}

