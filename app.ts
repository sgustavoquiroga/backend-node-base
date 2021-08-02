import dotenv from 'dotenv';
import Server from './src/server/server';

// dotenv config
dotenv.config();

const server = new Server();
server.listen();