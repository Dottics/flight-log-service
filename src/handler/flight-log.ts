import { Request, Response } from 'express'
import { selectFlightLog } from '../includes/flight-log'

/**
* getFlightLogs aggregates all the user's flight logs and sends all of them to
* the user.
*/
const getFlightLogs = async (req: Request, res: Response) => {
    const { userUUID } = req.query

    // TODO: add UUID validation

    if (userUUID === undefined) {
        res.status(400).json({
            message: 'Bad Request',
            errors: {
                'userUUID': ['is required']
            }
        })
        return
    }

    const logs = await selectFlightLog(userUUID as string)

    if (logs.length === 0) {
        res.status(404).json({
            message: 'Not Found',
            errors: {
                'flightLogs': ['not found']
            }
        })
        return
    }

    res.status(200).json({
        message: 'user flight logs found',
        data: {
            flightLogs: logs,
        }
    })

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