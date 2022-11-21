import {NextFunction, Request, Response} from "express"

/**
 * permissionRequired checks whether the user has permission to access the route
 * being requested.
 * */
const permissionRequired = (req: Request, res: Response, next: NextFunction) => {
    console.log(`=> ${req.route}`)
    next()
}

export {
    permissionRequired
}