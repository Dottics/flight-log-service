import { query } from '../database/db'
import { logError, map } from '../utils/misc'

type FlightLog = {
    userUUID: string;
    UUID: string;
    date: Date;
    aircraftType: string;
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
    uuid: string;
    date: Date;
    aircraft_type: string;
    registration: string;
    pilot_in_command: string;
    details: string;
    instrument_nav_aids: string;
    instrument_place: string;
    instrument_actual: string;
    instrument_fstd: string;
    instructor_se: string;
    instructor_me: string;
    instructor_fstd: string;
    fstd: string;
    engine_type: 'single' | 'multi';
    day_type: 'day' | 'night';
    dual: string;
    pic: string;
    picus: string;
    copilot: string;
    day_landings: string;
    night_landings: string;
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
                `SELECT * FROM tb_log WHERE user_uuid = $1
                ORDER BY id, create_date`,
                [userUUID]
            )
            // client.release()
            return rows.map((row) => map.dbToFlightLog(row));
        }
        if (userUUID && UUID) {
            // get a specific flight log
            const { rows } = await query(
                'SELECT * FROM tb_log WHERE user_uuid = $1 AND uuid = $2',
                [userUUID, UUID]
            )
            // client.release()
            return rows.map((row) => map.dbToFlightLog(row));
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
        data.aircraftType,
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
* updateFlightLog updates a flight log in the database.
*
* @param data is the flight log data.
*/
const updateFlightLog = async (data: FlightLog) => {
    const flightLogDestructured = [
        data.userUUID,
        data.date.toISOString(),
        data.aircraftType,
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
        data.UUID,
        ]
    try {
        const { rows } = await query(
            `UPDATE tb_log SET
            user_uuid = $1, date = $2, aircraft_type = $3, registration = $4,
            pilot_in_command = $5, details = $6, instrument_nav_aids = $7,
            instrument_place = $8, instrument_actual = $9, instrument_fstd = $10,
            instructor_se = $11, instructor_me = $12, instructor_fstd = $13,
            fstd = $14, engine_type = $15, day_type = $16, dual = $17, pic = $18,
            picus = $19, copilot = $20, day_landings = $21, night_landings = $22,
            remarks = $23
            WHERE uuid = $24 RETURNING *`,
            flightLogDestructured
        )
        return map.dbToFlightLog(rows[0])
    } catch(e: unknown) {
        throw logError('createFlightLog', e)
    }
}

/**
* delelteFlightLog delete's a specific flight log from the database.
*
* @param userUUID is the user's UUID who's flight logs are to be deleted.
* @param UUID is the UUID of a specific flight log to be deleted.
*/
const deleteFlightLog = async (userUUID: string, UUID: string) => {
    try {
        const { rows } = await query(
            'DELETE FROM tb_log WHERE user_uuid = $1 AND uuid = $2 RETURNING *',
            [userUUID, UUID]
        )
        if (rows.length === 0) {
            return null
        }
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
    updateFlightLog,
    deleteFlightLog
}