import * as jwt from 'jsonwebtoken';

const jwtSecret: string = process.env.JWT_SECRET || 'secret key';

export async function createToken(username: string): Promise<string> {
    const user = { username: username };
    const token = await jwt.sign(user, jwtSecret);
    return token;
}

export function verify(token: string): boolean {
    try {
        jwt.verify(token, jwtSecret);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}