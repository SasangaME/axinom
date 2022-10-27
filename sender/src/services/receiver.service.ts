import axios from 'axios';
import { Content } from "../models/content.response";

export async function sendToReceiver(req: Content) {
    const url: string = `http://localhost:4002/api/v1/receive/`;
    const { data } = await axios.post(url, req, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    },
    );
    console.log(data);
}