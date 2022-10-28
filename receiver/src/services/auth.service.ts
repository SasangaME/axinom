import { SystemUser } from "../models/dto/user.model";
import { hashPassword } from '../utils/password-hash.util';
import { User } from "../models/schema/user.schema";
import { LoginRequest } from "../models/dto/login-request.model";
import STATUS_CODE from '../constants/status-codes.constant';
import STATUS_MESSAGE from '../constants/status-messages.constant';
import { createToken } from '../utils/jwt.util';

export async function createUser(user: SystemUser) {
    const passwordHash = await hashPassword(user.password);
    const data = new User({
        username: user.username,
        password: passwordHash,
        service: user.service
    });
    await data.save();
}

export async function login(loginRequest: LoginRequest) {
    const user = await User.findOne({ username: loginRequest.username });
    if (user === null) {
        const err = {
            statusCode: STATUS_CODE.UNAUTHORIZED,
            message: STATUS_MESSAGE.USER_NOT_FOUND
        }
        throw err;
    }
    const passwordHash = await hashPassword(loginRequest.password);
    if (user.password !== passwordHash) {
        const err = {
            statusCode: STATUS_CODE.UNAUTHORIZED,
            message: STATUS_MESSAGE.INVALID_PASSWORD
        };
        throw err;
    }
    const token = await createToken(loginRequest.username);
    return token;
}

export async function authenticate(token: string) {

}