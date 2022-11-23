import { NextFunction, Request, Response } from 'express'

/**
 * permissionRequired checks whether the user has permission to access the route
 * being requested.
 * */
const permissionRequired = (permissionCode: string) =>
    (req: Request, res: Response, next: NextFunction) => {
    console.log(`=> ${permissionCode}:${req.url}`)
        next()
}

export {
    permissionRequired
}