import { Request, Response } from 'express'

/**
* getFlightLogs aggregates all the user's flight logs and sends all of them to
* the user.
*/
const getFlightLogs = (req: Request, res: Response) => {
    const { userUUID } = req.query

    if (userUUID === undefined) {
        res.status(400).json({
            message: 'Bad Request',
            errors: {
                'userUUID': ['is required']
            }
        })
    }
}

/**
* getFlightLog sends a specific user's flight log based on the flight log UUID.
*/
const getFlightLog = (req: Request, res: Response) => {

}

export {
    getFlightLogs,
    getFlightLog,
}