import 'dotenv/config'; 
import express from 'express';

import setupMongoDB from './config/setupMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authenticationRoutes/authentication.js';
import profileRoutes from './routes/profileRoutes/profileRoutes.js';
import productRoutes from './routes/productRoutes/productRoutes.js';
import refreshTokenRoutes from './routes/refreshTokenRoutes/refreshTokenRoutes.js';


setupMongoDB();

const app = express();
const runningPort = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', productRoutes);
app.use('/api', refreshTokenRoutes);
app.use(errorHandler);


app.listen(runningPort, () => {
    console.log(`Server is running on port ${runningPort}`);
});