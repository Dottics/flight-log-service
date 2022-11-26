import { Request, Response } from 'express'
import {createFlightLog, selectFlightLog, updateFlightLog} from '../includes/flight-log'
import { v } from '../utils/validator'
import { map } from '../utils/misc'

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
            errors: map.validationError(errors),
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
            errors: map.validationError(errors),
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
const postFlightLog = async (req: Request, res: Response) => {
    const schema = {
        type: 'object',
        properties: {
            userUUID: {
                type: 'string',
                '$ref': '/RegexSchema'
            },
            date: {
                type: 'string',
                '$ref': '/DateSchema'
            },
            aircraftType: {
                type: 'string',
            },
            registration: {
                type: 'string',
            },
            pilotInCommand: {
                type: 'string',
            },
            details: {
                type: 'string',
            },
            instrumentNavAids: {
                type: 'string',
            },
            instrumentPlace: {
                type: 'string',
            },
            instrumentActual: {
                type: 'number',
            },
            instrumentFSTD: {
                type: 'number',
            },
            instructorSE: {
                type: 'number',
            },
            instructorME: {
                type: 'number',
            },
            instructorFSTD: {
                type: 'number',
            },
            FSTD: {
                type: 'number',
            },
            engineType: {
                type: 'string',
                pattern: /^(single|multi)$/
            },
            dayType: {
                type: 'string',
                pattern: /^(day|night)$/
            },
            dual: {
                type: 'number',
            },
            PIC: {
                type: 'number',
            },
            PICUS: {
                type: 'number',
            },
            copilot: {
                type: 'number',
            },
            dayLandings: {
                type: 'number',
            },
            nightLandings: {
                type: 'number',
            },
            remarks: {
                type: 'string',
            },
        },
        required: ['userUUID', 'date', 'aircraftType', 'registration', 'pilotInCommand',
        'details', 'instrumentNavAids', 'instrumentPlace', 'instrumentActual',
        'instrumentFSTD', 'instructorSE', 'instructorME', 'instructorFSTD',
        'FSTD', 'engineType', 'dayType', 'dual', 'PIC', 'PICUS', 'copilot',
        'dayLandings', 'nightLandings', 'remarks'],
    }
    const { valid, errors } = v.validate(req.body, schema)
    if (!valid) {
        res.status(400).json({
            message: 'Bad Request',
            errors: map.validationError(errors),
        })
        return
    }
    const flightLog = await createFlightLog(req.body)
    res.status(201).json({
        message: 'flight log saved',
        data: {
            flightLog,
        },
    })
}

/**
* putFlightLog is the handler to update a flight log's data.
*/
const putFlightLog = async (req: Request, res: Response) => {
    const schema = {
        type: 'object',
        properties: {
            userUUID: {
                type: 'string',
                '$ref': '/RegexSchema'
            },
            date: {
                type: 'string',
                '$ref': '/DateSchema'
            },
            aircraftType: {
                type: 'string',
            },
            registration: {
                type: 'string',
            },
            pilotInCommand: {
                type: 'string',
            },
            details: {
                type: 'string',
            },
            instrumentNavAids: {
                type: 'string',
            },
            instrumentPlace: {
                type: 'string',
            },
            instrumentActual: {
                type: 'number',
            },
            instrumentFSTD: {
                type: 'number',
            },
            instructorSE: {
                type: 'number',
            },
            instructorME: {
                type: 'number',
            },
            instructorFSTD: {
                type: 'number',
            },
            FSTD: {
                type: 'number',
            },
            engineType: {
                type: 'string',
                pattern: /^(single|multi)$/
            },
            dayType: {
                type: 'string',
                pattern: /^(day|night)$/
            },
            dual: {
                type: 'number',
            },
            PIC: {
                type: 'number',
            },
            PICUS: {
                type: 'number',
            },
            copilot: {
                type: 'number',
            },
            dayLandings: {
                type: 'number',
            },
            nightLandings: {
                type: 'number',
            },
            remarks: {
                type: 'string',
            },
        },
        required: ['userUUID', 'date', 'aircraftType', 'registration', 'pilotInCommand',
                   'details', 'instrumentNavAids', 'instrumentPlace', 'instrumentActual',
                   'instrumentFSTD', 'instructorSE', 'instructorME', 'instructorFSTD',
                   'FSTD', 'engineType', 'dayType', 'dual', 'PIC', 'PICUS', 'copilot',
                   'dayLandings', 'nightLandings', 'remarks'],
    }
    const { valid, errors } = v.validate(req.body, schema)
    if (!valid) {
        res.status(400).json({
            message: 'Bad Request',
            errors: map.validationError(errors),
        })
        return
    }

    const flightLog = await updateFlightLog(req.body)

    res.status(200).json({
        message: 'flight log updated',
        data: {
            flightLog,
        }
    })
}

export {
    getFlightLogs,
    getFlightLog,
    postFlightLog,
    putFlightLog
}