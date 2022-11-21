import { FlightLog } from '../src/database/flight-log'

const mockFlightLog = (overrides: Partial<FlightLog> = {}) => {
    return {
        userUUID: '54f94bbc-1394-4796-a5a0-7e847afbb813',
        date: new Date('2022-11-21T18:48:23.000Z'),
        type: 'A310',
        registration: 'ZXYIOU',
        ...overrides
    }
}

export {
    mockFlightLog
}