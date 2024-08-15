import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import redis from 'redis';
import authRoutes from './routes/authRouter.js'
import courseRoutes from './routes/courseRouter.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
dotenv.config()

const app = express();
const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});
redisClient.connect();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', apiLimiter);
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }));

app.use(helmet());
app.use(errorMiddleware)

app.use('/api/auth', authRoutes);
app.use('/api/', courseRoutes)




export default app;