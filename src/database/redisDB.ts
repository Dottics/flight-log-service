import { createClient } from 'redis'

const redis = createClient({
    socket: {
        host: process.env.REDISHOST ?? '127.0.0.1',
        port: process.env.REDISPORT ? Number(process.env.REDISPORT) : 6379,
    }
});
redis.on('error', (err: Error) => console.log('Redis Client Error', err));

export { redis }