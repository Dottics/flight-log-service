import { FlightLog } from 'includes/flight-log'

const mockFlightLog = (overrides: Partial<FlightLog> = {}): FlightLog => {
    return {
        UUID: '54f94bbc-1394-4796-a5a0-7e847afbb813',
        userUUID: '54f94bbc-1394-4796-a5a0-7e847afbb813',
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
        FSTD: 0,
        engineType: 'single',
        dayType: 'day',
        dual: 0,
        PIC: 0,
        PICUS: 0,
        copilot: 0,
        dayLandings: 0,
        nightLandings: 1,
        remarks: 'weather conditions not ideal',
        ...overrides
    }
}

export {
    mockFlightLog
}