import express from 'express';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.routes.js';
import requestRoutes from './routes/request.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
const MongoUrl = process.env.MONGOURL;
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('<h1>Hello world!!</h1>');
});

app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/request', requestRoutes);


if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
        const indexFile = path.join(distPath, "index.html");
        if (fs.existsSync(indexFile)) {
            res.sendFile(indexFile);
        } else {
            res.status(500).send("index.html not found!!");
        }
    });
}

mongoose.connect(MongoUrl).then(() => {
    console.log('Database is connected successfully!!');
    app.listen(port, () => {
        console.log(`Your server is running on port ${port}`);
    });
}).catch((error) => {
    console.log(error.message);
});