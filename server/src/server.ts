import http from 'http';
import { Request, Response, NextFunction } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from './config';
import app from './app/app';

const HOST: string = String(process.env.HOST || 'localhost');
const PORT: number = Number(process.env.PORT || 8080);
const DB_URI: string = String(process.env.MONGO_URI || 'mongodb://localhost:27017/socialMeta');

// Node server..
const server: http.Server = http.createServer(app);

// Initialize Socket.IO Server..
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
});

// Middleware to attach `io` to request for real-time communication..
app.use((req: Request, _res: Response, next: NextFunction) => {
    (req as any).io = io;
    next();
});

// Connection Handler for Socket.IO..
io.on('connection', (socket) => {
    console.log('A user connected - ', socket.id);

    // Handle Disconnection Event..
    socket.on('disconnect', () => {
        console.log('A user disconnected - ', socket.id);
    });
});

// DB Connection and server Listening..
connectDB(DB_URI)
    .then(() => {
        console.log('------ Database is connected! -------');
        // Listening to Server..
        server.listen(PORT, HOST, () => {
            console.log(`Welcome to -- ${process.env.APP_NAME} -- `);
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.log('ERR! Can\'t Connected with Database! --> ', error.message);

        // Closing server for error reason..
        server.close(() => {
            console.log('Server is closed');
            process.exit(1);
        });
    });