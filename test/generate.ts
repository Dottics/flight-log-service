import { FlightLog, DBFlightLog } from 'includes/flight-log'
import { AircraftType } from 'includes/aircraft-type'

const mockAircraftType = (overrides: Partial<AircraftType> = {}): AircraftType => {
    return {
        uuid: '54f94bbc-1394-4796-a5a0-7e847afbb813',
        name: 'A380',
        description: 'a plane with code 380',
        ...overrides,
    }
}

const mockDBFlightLog = (overrides: Partial<DBFlightLog> = {}): DBFlightLog => {
    return {
        user_uuid: '54f94bbc-1394-4796-a5a0-7e847afbb813',
        uuid: '54f94bbc-1394-4796-a5a0-7e847afbb813',
        date: new Date('2022-11-21T18:48:23.000Z'),
        aircraft_type_id: 3,
        registration: 'XYZIOU',
        pilot_in_command: 'SELF',
        details: 'HKG-CPT',
        instrument_nav_aids: 'abc',
        instrument_place: 'xyz',
        instrument_actual: '1',
        instrument_fstd: '0',
        instructor_se: '0',
        instructor_me: '0',
        instructor_fstd: '0',
        fstd: '0',
        engine_type: 'single',
        day_type: 'day',
        dual: '0',
        pic: '0',
        picus: '0',
        copilot: '0',
        day_landings: '0',
        night_landings: '1',
        remarks: 'weather conditions not ideal',
        ...overrides,
    }
}

const mockFlightLog = (overrides: Partial<FlightLog> = {}): FlightLog => {
    return {
        uuid: '54f94bbc-1394-4796-a5a0-7e847afbb813',
        userUuid: '54f94bbc-1394-4796-a5a0-7e847afbb813',
        date: new Date('2022-11-21T18:48:23.000Z'),
        aircraftType: 'A310',
        registration: 'ZXYIOU',
        pilotInCommand: 'SELF',
        details: 'HKG-CPT',
        instrumentNavAids: 'ivl',
        instrumentPlace: 'jvl',
        instrumentActual: 1,
        instrumentFSTD: 0,
        instructorSE: 0,
        instructorME: 0,
        instructorFSTD: 0,
        fstd: 0,
        engineType: 'single',
        dayType: 'day',
        dual: 0,
        pic: 0,
        picus: 0,
        copilot: 0,
        dayLandings: 0,
        nightLandings: 1,
        remarks: 'weather conditions not ideal',
        ...overrides
    }
}

export {
    mockFlightLog,
    mockDBFlightLog,
    mockAircraftType,
}