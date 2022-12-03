import { Request, Response } from 'express'
import { Schema, ValidationError } from 'jsonschema'
import {
    createFlightLog,
    deleteFlightLog,
    selectFlightLog,
    updateFlightLog
} from '../includes/flight-log'
import { v } from '../utils/validator'
import { map } from '../utils/misc'

/**
* validateData validates the data instance, returns a failed validation body
* or null if the data is valid.
*/
const validateData = (instance: any, schema: Schema): {message: string, errors: Partial<ValidationError>[]} | null => {
    const { valid, errors } = v.validate(instance, schema)
    if (!valid) {
        return {
            message: 'Bad Request',
            errors: map.validationError(errors),
        }
    }
    return null
}

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
    const validationBody = validateData(req.query, schema)
    if (validationBody) {
        res.status(400).json(validationBody)
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
    const validationBody = validateData(req.query, schema)
    if (validationBody) {
        res.status(400).json(validationBody)
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
        data: { flightLog: logs[0] }
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
            aircraftTypeUUID: {
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
        required: ['userUUID', 'date', 'aircraftTypeUUID', 'registration', 'pilotInCommand',
        'details', 'instrumentNavAids', 'instrumentPlace', 'instrumentActual',
        'instrumentFSTD', 'instructorSE', 'instructorME', 'instructorFSTD',
        'FSTD', 'engineType', 'dayType', 'dual', 'PIC', 'PICUS', 'copilot',
        'dayLandings', 'nightLandings', 'remarks'],
    }
    const validationBody = validateData(req.body, schema)
    if (validationBody) {
        res.status(400).json(validationBody)
        return
    }
    const flightLog = await createFlightLog(req.body)
    res.status(201).json({
        message: 'flight log saved',
        data: { flightLog },
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
            aircraftTypeUUID: {
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
        required: ['userUUID', 'date', 'aircraftTypeUUID', 'registration', 'pilotInCommand',
                   'details', 'instrumentNavAids', 'instrumentPlace', 'instrumentActual',
                   'instrumentFSTD', 'instructorSE', 'instructorME', 'instructorFSTD',
                   'FSTD', 'engineType', 'dayType', 'dual', 'PIC', 'PICUS', 'copilot',
                   'dayLandings', 'nightLandings', 'remarks'],
    }
    const validationBody = validateData(req.body, schema)
    if (validationBody) {
        res.status(400).json(validationBody)
        return
    }

    const flightLog = await updateFlightLog(req.body)

    res.status(200).json({
        message: 'flight log updated',
        data: { flightLog }
    })
}

/**
* delFlightLog deletes a flight log record
*/
const delFlightLog = async (req: Request, res: Response) => {
    const schema = {
        type: 'object',
        properties: {
            userUUID: {
                type: 'string',
                $ref: '/RegexSchema'
            },
            UUID: {
                type: 'string',
                $ref: '/RegexSchema'
            },
        },
        required: ['userUUID', 'UUID']
    }
    const validationBody = validateData(req.query, schema)
    if (validationBody) {
        res.status(400).json(validationBody)
        return
    }

    const { userUUID, UUID } = req.query
    const flightLog = await deleteFlightLog(userUUID as string, UUID as string)
    if (!flightLog) {
        res.status(404).json({
            message: 'Not Found',
            errors: {
                mismatch: ['userUUID and UUID do not match']
            }
        })
        return
    }

    res.status(200).json({
        message: 'flight log deleted',
    })
}

export {
    getFlightLogs,
    getFlightLog,
    postFlightLog,
    putFlightLog,
    delFlightLog
}