import { ContentRequest } from "../models/dto/content.model";
import { Content } from '../models/schema/content.schema';

export async function fileReceive(content: ContentRequest) {
    console.log('receiver called');
    const data = new Content({
        path: content.path,
        contents: content.contents,
        createdBy: content.createdBy,
        createdDate: content.createdDate
    });
    const result = await data.save();
    console.log(result);
}