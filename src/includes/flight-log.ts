import { query } from '../database/db'
import { logError, map } from '../utils/misc'

type FlightLog = {
    userUUID: string;
    date: Date;
    type: string;
    registration: string;
    pilotInCommand: string;
    details: string;
    instrumentNavAids: string;
    instrumentPlace: string;
    instrumentActual: number;
    instrumentFSTD: number;
    instructorSE: number;
    instructorME: number;
    instructorFSTD: number;
    FSTD: number;
    engineType: 'single' | 'multi';
    dayType: 'day' | 'night';
    dual: number;
    PIC: number;
    PICUS: number;
    copilot: number;
    dayLandings: number;
    nightLandings: number;
    remarks: string;
}
type DBFlightLog = {
    user_uuid: string;
    date: Date;
    type: string;
    registration: string;
    pilot_in_command: string;
    details: string;
    instrument_nav_aids: string;
    instrument_place: string;
    instrument_actual: number;
    instrument_fstd: number;
    instructor_se: number;
    instructor_me: number;
    instructor_fstd: number;
    fstd: number;
    engine_type: 'single' | 'multi';
    day_type: 'day' | 'night';
    dual: number;
    pic: number;
    picus: number;
    copilot: number;
    day_landings: number;
    night_landings: number;
    remarks: string;
}

/**
* selectFlightLog fetches all the flight logs from the database.
*
* @param userUUID is the user's UUID who's flight logs are to be retrieved.
* @param UUID is the UUID of a specific flight log to be retrieved.
*/
const selectFlightLog = async (userUUID: string, UUID?: string) => {
    // const client = await pool.connect()
    try {
        if (UUID === undefined) {
            // get all user flight logs
            const { rows } = await query(
                'SELECT * FROM tb_log WHERE user_uuid = $1',
                [userUUID]
            )
            // client.release()
            return rows;
        }
        if (userUUID && UUID) {
            // get a specific flight log
            const { rows } = await query(
                'SELECT * FROM tb_log WHERE user_uuid = $1 AND id = $2',
                [userUUID, UUID]
            )
            // client.release()
            return rows;
        }
        return []
    } catch(e: unknown) {
        // always release the client even if there is an error
        // client.release()
        throw logError('selectFlightLog', e)
    }
}

/**
* createFlightLog creates a new flight log in the database.
*
* @param data is the flight log data.
*/
const createFlightLog = async (data: FlightLog) => {
    const flightLogDestructured = [
        data.userUUID,
        data.date.toISOString(),
        data.type,
        data.registration,
        data.pilotInCommand,
        data.details,
        data.instrumentNavAids,
        data.instrumentPlace,
        data.instrumentActual.toString(),
        data.instrumentFSTD.toString(),
        data.instructorSE.toString(),
        data.instructorME.toString(),
        data.instructorFSTD.toString(),
        data.FSTD.toString(),
        data.engineType,
        data.dayType,
        data.dual.toString(),
        data.PIC.toString(),
        data.PICUS.toString(),
        data.copilot.toString(),
        data.dayLandings.toString(),
        data.nightLandings.toString(),
        data.remarks,
    ]
    try {
        const { rows } = await query(
            `INSERT INTO tb_log (
            user_uuid, date, aircraft_type, registration, pilot_in_command, details,
            instrument_nav_aids, instrument_place, instrument_actual, instrument_fstd,
            instructor_se, instructor_me, instructor_fstd, fstd, engine_type, day_type,
            dual, pic, picus, copilot, day_landings, night_landings, remarks
            ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, $22, $23
            ) RETURNING *`,
            flightLogDestructured
        )
        return map.dbToFlightLog(rows[0])
    } catch(e: unknown) {
        throw logError('createFlightLog', e)
    }
}

/**
* deleteFlightLog delete's a specific flight log from the database.
*
* @param userUUID is the user's UUID who's flight logs are to be deleted.
* @param UUID is the UUID of a specific flight log to be deleted.
*/
const deleteFlightLog = async (userUUID: string, UUID: string) => {
    try {
        const { rows } = await query(
            'DELETE FROM tb_log WHERE user_uuid = $1 AND id = $2 RETURNING *',
            [userUUID, UUID]
        )
        return map.dbToFlightLog(rows[0])
    } catch(e: unknown) {
        throw logError('deleteFlightLog', e)
    }
}

export {
    FlightLog,
    DBFlightLog,
    selectFlightLog,
    createFlightLog,
    deleteFlightLog
}