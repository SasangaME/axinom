import { Schema, model } from 'mongoose';
import { SystemUser } from '../dto/user.model';

const userSchema = new Schema<SystemUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    service: { type: String }
});

const User = model('User', userSchema);
export { User };