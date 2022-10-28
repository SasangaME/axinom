import axios from 'axios';

export async function getData() {
    const { data } = await axios.get('http://localhost:4002/api/v1/content');
    return data;
}

export async function getDataById(id) {
    const { data } = await axios.get(` http://localhost:4002/api/v1/content/${id}`);
    return data;
}