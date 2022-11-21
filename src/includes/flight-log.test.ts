import { mockFlightLog } from 'generate'
import { randomUUID } from 'crypto'
import { FlightLog } from './flight-log'

describe('FlightLog', () => {
    it('should have public properties', () => {
        const f = mockFlightLog()

        expect(f.userUUID).toEqual('54f94bbc-1394-4796-a5a0-7e847afbb813')
        expect(f.date.toISOString()).toEqual('2022-11-21T18:48:23.000Z')
        expect(f.type).toEqual('A310')
        expect(f.registration).toEqual('ZXYIOU')
    })
})

describe('selectFlightLog', () => {
    it.skip('TBI', () => {})
})

describe('createFlightLog', () => {
    it.skip('TBI', () => {})
})

describe('deleteFlightLog', () => {
    it.skip('TBI', () => {})
})