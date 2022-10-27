import { connect, connection } from 'mongoose';

export function dbConnect() {
    const mongoString: string = process.env.MONGO_DB_URL || 'default url';
    connect(mongoString);
    const database = connection;
    database.on('error', (error) => {
        console.log(error)
    })
    database.once('connected', () => {
        console.log('Database Connected');
    })
}