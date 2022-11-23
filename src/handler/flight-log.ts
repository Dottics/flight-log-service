import { Request, Response } from 'express'
import { selectFlightLog } from '../includes/flight-log'
import { v } from '../utils/validator'

/**
* getFlightLogs aggregates all the user's flight logs and sends all of them to
* the user.
*/
const getFlightLogs = async (req: Request, res: Response) => {
    const { userUUID } = req.query
    const schema = {
        type: 'object',
        properties: {
            userUUID: {
                type: 'string',
                '$ref': '/RegexSchema'
            }
        },
        required: ['userUUID'],
    }
    const { valid, errors } = v.validate(req.query, schema)
    if (!valid) {
        res.status(400).json({
            message: 'Bad Request',
            errors,
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
const getFlightLog = async (req: Request, res: Response) => {
    const schema = {
        type: 'object',
        properties: {
            userUUID: {
                type: 'string',
                '$ref': '/RegexSchema'
            },
            UUID: {
                type: 'string',
                '$ref': '/RegexSchema'
            },
        },
        required: ['userUUID', 'UUID'],
    }
    const { valid, errors } = v.validate(req.query, schema)
    if (!valid) {
        res.status(400).json({
            message: 'Bad Request',
            errors: errors.map(e => ({[e.argument]: e.name})),
        })
        return
    }
    const { userUUID, UUID } = req.query
    const logs = await selectFlightLog(userUUID as string, UUID as string)
    if (logs.length === 0) {
        return res.status(404).json({
            message: 'Not Found',
            errors: {
                'flightLog': ['not found']
            }
        })
    }
    res.status(200).json({
        message: 'flight log found',
        data: {
            flightLog: logs[0]
        }
    })
}

/**
* postFlightLog creates a new flight log for a user, then returns all the user's
* flight logs.
*/
const postFlightLog = (req: Request, res: Response) => {

}

export {
    getFlightLogs,
    getFlightLog,
}