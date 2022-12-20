import { NextFunction, Request, Response } from 'express'
import jwt, { Algorithm } from 'jsonwebtoken'
import { redis } from '../database/redisDB'

type JWTSession = {
    "s-token": string;
    "s-id": string;
    "u-id": string;
    created: string;
}

type RedisSession = {
    session_id: string;
    permission: string[];
    created: string;
}

/**
 * permissionRequired checks whether the user has permission to access the route
 * being requested.
 * */
const permissionRequired = (permissionCode: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(`=> ${permissionCode}:${req.url}`)
        const token = (req.get('x-user-token') ?? '') as string
        console.log(process.env.JWT_CODE)
        console.log(process.env.JWT_ALGORITHM)
        try {
            const code = process.env.JWT_CODE ?? ''
            const algorithm = (process.env.JWT_ALGORITHM ?? 'HS256') as Algorithm
            const decoded = jwt.verify(token, code, { algorithms: [algorithm]}) as JWTSession;
            const sID = decoded['s-id']

            // get session from redis
            if (!redis.isReady) {
                await redis.connect()
            }
            const row = JSON.parse(await redis.get(sID) as string) as RedisSession || null
            // close the redis connection
            await redis.quit()

            const permissions = row.permission ?? []
            if (permissions.length === 0) {
                res.status(401).json({
                    message: 'Unauthorised',
                    errors: { session: ['invalid'] },
                })
                return
            }
            if (permissions.includes(permissionCode)) {
                // if the user has permission: continue
                next()
                return
            }
        } catch(err) {
            console.error(`Unable to decode token ${token}: ${err}`)
            res.status(401).json({
                message: 'Unauthorised',
                errors: { token: ['invalid'] },
            })
            return
        }
        res.status(403).json({
            message: 'Forbidden',
            errors: { permission: ['Please ensure you have permission'] },
        })
    }

export {
    permissionRequired
}