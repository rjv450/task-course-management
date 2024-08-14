import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import redis from 'redis';
import authRoutes from './routes/authRouter.js'
dotenv.config()

const app = express();
const redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });
  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });
  redisClient.connect();
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes);

app.use(errorMiddleware)


export default app;