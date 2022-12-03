import { query } from '../database/db'

import { map } from '../utils/misc'

type AircraftType = {
    UUID: string;
    name: string;
    description: string;
}

type DBAircraftType = {
    uuid: string;
    name: string;
    description: string;
    active: boolean;
}

/**
* selectAircraftType returns all or one aircraft type(s).
*
* @param UUID is the UUID of the specific aircraft type to be returned
*/
const selectAircraftType = async (UUID?: string): Promise<AircraftType[]> => {
    if (UUID) {
        const { rows } = await query(`SELECT * FROM tb_aircraft_type WHERE active = TRUE AND uuid = $1 ORDER BY name`, [UUID])
        return rows.map((row) => map.dbToAircraftType(row))
    }
    const { rows } = await query(`SELECT * FROM tb_aircraft_type`, [])
    return rows.map((row) => map.dbToAircraftType(row))
}

export {
    AircraftType,
    DBAircraftType,
    selectAircraftType,
}