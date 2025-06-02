import express from 'express';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const MongoUrl = process.env.MONGOURL;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('<h1>Hello world!!</h1>');
});

app.use('/api/auth', authRoutes);

mongoose.connect(MongoUrl).then(() => {
    console.log('Database is connected successfully!!');
    app.listen(port, () => {
        console.log(`Your server is running on port ${port}`);
    });
}).catch((error) => {
    console.log(error.message);
});