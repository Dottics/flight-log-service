
type FlightLog = {
    userUUID: string;
    date: Date;
    type: string;
    registration: string;
}

/**
* selectFlightLog fetches all the flight logs from the database.
*
* @param userUUID is the user's UUID who's flight logs are to be retrieved.
* @param UUID is the UUID of a specific flight log to be retrieved.
*/
const selectFlightLog = (userUUID: string, UUID?: string) => {
    if (UUID === undefined) {
        // get all user flight logs
        return []
    }
    if (userUUID && UUID) {
        // get a specific flight log
    }
}

/**
* createFlightLog creates a new flight log in the database.
*
* @param data is the flight log data.
*/
const createFlightLog = (data: FlightLog) => {
    return false
}

/**
* deleteFlightLog delete's a specific flight log from the database.
*
* @param userUUID is the user's UUID who's flight logs are to be deleted.
* @param UUID is the UUID of a specific flight log to be deleted.
*/
const deleteFlightLog = (userUUID: string, UUID: string) => {
    return false
}

export { FlightLog }