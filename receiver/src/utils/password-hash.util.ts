import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
    const hash = await crypto.createHmac('sha512', 'secret').update(password).digest('hex');
    return hash;
}