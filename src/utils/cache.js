import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();


const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});


redisClient.connect().catch((err) => {
  console.error('Redis connection error:', err);
});


export const setCache = async (key, value, expiry = 3600) => {
  try {
    await redisClient.setEx(key, expiry, JSON.stringify(value));
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};


export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error getting cache:', err);
    return null;
  }
};


export const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error('Error deleting cache:', err);
  }
};
