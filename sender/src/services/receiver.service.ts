import axios from 'axios';
import { Content } from "../models/content.response";

export async function sendToReceiver(req: Content) {
    const url: string = `${process.env.BASE_URL}${process.env.RECEIVER_URL}`;
    console.log(url);
    const { data } = await axios.post(url, req, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${process.env.JWT}`
        },
    },
    );
    console.log(data);
}