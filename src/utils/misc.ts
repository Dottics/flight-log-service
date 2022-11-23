import { FlightLog, DBFlightLog } from '../includes/flight-log'

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

const map = {
    flightLogToDB: (v: FlightLog) => {

    },
    /**
    * dbToFlightLog converts from DB flight log to JSON flight log.
    */
    dbToFlightLog: (v: DBFlightLog): FlightLog => {
        return {
            userUUID: v.user_uuid,
            date: v.date,
            type: v.type,
            registration: v.registration,
            pilotInCommand: v.pilot_in_command,
            details: v.details,
            instrumentNavAids: v.instrument_nav_aids,
            instrumentPlace: v.instrument_place,
            instrumentActual: v.instrument_actual,
            instrumentFSTD: v.instrument_fstd,
            instructorSE: v.instructor_se,
            instructorME: v.instructor_me,
            instructorFSTD: v.instructor_fstd,
            FSTD: v.fstd,
            engineType: v.engine_type,
            dayType: v.day_type,
            dual: v.dual,
            PIC: v.pic,
            PICUS: v.picus,
            copilot: v.copilot,
            dayLandings: v.day_landings,
            nightLandings: v.night_landings,
            remarks: v.remarks,
        }
    }
}

export {
    logError,
    map
}