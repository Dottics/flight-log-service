import {NextFunction, Request, Response} from "express";

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message,
        // only return the error stack trace if not in production
        ...(process.env.NODE_ENV === 'production' ? null : { stack: err.stack })
    })
}

export {
    error
}