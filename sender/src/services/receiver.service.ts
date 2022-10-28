import axios from 'axios';
import { Content } from "../models/content.response";

export async function sendToReceiver(req: Content, token: String) {
    const url: string = `${process.env.BASE_URL}${process.env.RECEIVER_URL}`;
    console.log(url);
    await axios.post(url, req, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
    },
    );
}