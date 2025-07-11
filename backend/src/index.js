import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.routes.js';
import requestRoutes from './routes/request.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
const MongoUrl = process.env.MONGOURL;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/request', requestRoutes);
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.resolve(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
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