import { Schema, model } from 'mongoose';
import { ContentRequest } from '../dto/content.model';

const contentSchema = new Schema<ContentRequest>({
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    contents: [{ type: String }],
    createdBy: { type: String },
    createdDate: { type: String }
});

const Content = model('Content', contentSchema);

export { Content };