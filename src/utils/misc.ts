import {ValidationError} from 'jsonschema'

import { FlightLog, DBSelectFlightLog, DBFlightLog } from '../includes/flight-log'
import { DBAircraftType, AircraftType } from '../includes/aircraft-type'

/**
* logError takes an unknown error converts it to an error logs the error with
* the function name and returns the error.
*
* @param fnName is the function name.
* @param e is the unknown error.
*/
const logError = (fnName: string, e: unknown): Error => {
    const err = e as Error
    console.error(fnName, err)
    return err
}

/**
* map is an object that contains generic and frequently used mappings from
* one object structure to another.
*/
const map = {
    dbToAircraftType: (v: DBAircraftType): AircraftType => {
        return {
            UUID: v.uuid,
            name: v.name,
            description: v.description,
        }
    },
    flightLogToDB: (v: FlightLog) => {

    },
    /**
    * dbToFlightLog converts from DB flight log to JSON flight log.
    */
    dbToFlightLog: (v: DBFlightLog): FlightLog => {
        return {
            userUUID: v.user_uuid,
            UUID: v.uuid,
            date: v.date,
            aircraftType: '',
            registration: v.registration,
            pilotInCommand: v.pilot_in_command,
            details: v.details,
            instrumentNavAids: v.instrument_nav_aids,
            instrumentPlace: v.instrument_place,
            instrumentActual: parseFloat(v.instrument_actual),
            instrumentFSTD: parseFloat(v.instrument_fstd),
            instructorSE: parseFloat(v.instructor_se),
            instructorME: parseFloat(v.instructor_me),
            instructorFSTD: parseFloat(v.instructor_fstd),
            FSTD: parseFloat(v.fstd),
            engineType: v.engine_type,
            dayType: v.day_type,
            dual: parseFloat(v.dual),
            PIC: parseFloat(v.pic),
            PICUS: parseFloat(v.picus),
            copilot: parseFloat(v.copilot),
            dayLandings: parseFloat(v.day_landings),
            nightLandings: parseFloat(v.night_landings),
            remarks: v.remarks,
        }
    },
    /**
    * dbToFlightLog converts from DB flight log to JSON flight log.
    */
    dbSelectToFlightLog: (v: DBSelectFlightLog): FlightLog => {
        return {
            userUUID: v.user_uuid,
            UUID: v.uuid,
            date: v.date,
            aircraftType: v.aircraft_type,
            registration: v.registration,
            pilotInCommand: v.pilot_in_command,
            details: v.details,
            instrumentNavAids: v.instrument_nav_aids,
            instrumentPlace: v.instrument_place,
            instrumentActual: parseFloat(v.instrument_actual),
            instrumentFSTD: parseFloat(v.instrument_fstd),
            instructorSE: parseFloat(v.instructor_se),
            instructorME: parseFloat(v.instructor_me),
            instructorFSTD: parseFloat(v.instructor_fstd),
            FSTD: parseFloat(v.fstd),
            engineType: v.engine_type,
            dayType: v.day_type,
            dual: parseFloat(v.dual),
            PIC: parseFloat(v.pic),
            PICUS: parseFloat(v.picus),
            copilot: parseFloat(v.copilot),
            dayLandings: parseFloat(v.day_landings),
            nightLandings: parseFloat(v.night_landings),
            remarks: v.remarks,
        }
    },
    /**
    * validationError maps from a validation error to an error that can be
    * returned to the user.
    */
    validationError: (errors: ValidationError[]) => {
        return errors.map((err) => {
            const e = err as Partial<ValidationError>
            delete e.schema
            return e
        })
    }
}

export {
    logError,
    map
}