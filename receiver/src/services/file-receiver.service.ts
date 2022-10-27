import { ContentRequest } from "../models/dto/content.model";

export async function fileReceive(req: ContentRequest) {
    console.log('receiver called');
    console.log(req);
}