import * as jwt from 'jsonwebtoken';

export async function createToken(username: string): Promise<string> {
    const jwtSecret: string = process.env.JWT_SECRET || 'secret key';
    const user = { username: username };
    const token = await jwt.sign(user, jwtSecret);
    return token;
}