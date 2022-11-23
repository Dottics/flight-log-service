import { pool } from '../database/db'
import { loadEnv, testResolve, rePopulateDB } from 'test-utils'
import { mockFlightLog } from 'generate'
import { FlightLog, selectFlightLog, createFlightLog, updateFlightLog } from './flight-log'

beforeAll(async () => {
    loadEnv()
    // reset the database
    await rePopulateDB()
})
afterAll(() => {
    jest.clearAllMocks()
})

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
    it('should return an empty array if the user has no flight logs', async () => {
        const logs = await selectFlightLog('baf46eac-7a11-4870-b0ec-c699cf794c41')
        expect(logs).toHaveLength(0)
    })

    it('should return an empty array if the specific flight log does not exist', async () => {
        const logs = await selectFlightLog('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '5a0de280-b365-4875-8101-1e235aa21eae')
        expect(logs).toHaveLength(0)
    })

    it('should read all flight logs from the database', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const logs = await selectFlightLog(userUUID)
        expect(logs.length).toBeGreaterThanOrEqual(5)
        expect(logs[0]).toMatchObject({
            type: 'C150',
            copilot: 0,
            date: new Date('2007-02-03T22:00:00.000Z'),
            dayLandings: 0,
            dayType: 'day',
            details: 'Ex4',
            dual: 0,
            engineType: 'single',
            FSTD: 0,
            instructorFSTD: 0,
            instructorME: 0,
            instructorSE: 0,
            instrumentActual: 0,
            instrumentFSTD: 0,
            instrumentNavAids: '',
            instrumentPlace: '',
            nightLandings: 0,
            PIC: 0,
            PICUS: 0,
            pilotInCommand: 'W Jacoby',
            registration: 'ZS-NRX',
            remarks: '',
            userUUID: userUUID,
            UUID: expect.any(String),
        })
    })

    it('should read a specific flight log from the database', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const UUID = '566b8e0d-da2e-4524-80db-573ac9dcd9b7'
        const logs = await selectFlightLog(userUUID, UUID)
        expect(logs).toHaveLength(1)
        expect(logs[0]).toMatchObject({
            type: 'C425',
            copilot: 1.5,
            date: new Date('2013-11-08T22:00:00.000Z'),
            dayLandings: 1,
            dayType: 'day',
            details: 'FYWE-FYLZ',
            dual: 0,
            engineType: 'multi',
            FSTD: 0,
            instructorFSTD: 0,
            instructorME: 0,
            instructorSE: 0,
            instrumentActual: 0,
            instrumentFSTD: 0,
            instrumentNavAids: '',
            instrumentPlace: '',
            nightLandings: 0,
            PIC: 0,
            PICUS: 0,
            pilotInCommand: 'C Roets',
            registration: 'V5-WAX',
            remarks: '',
            userUUID: userUUID,
            UUID: UUID,
        })
    })

    it('should throw error on an invalid UUID', async () => {
        console.error = jest.fn(() => {})
        const err = await selectFlightLog('some-random-uuid').catch(testResolve)

        expect(console.error).toHaveBeenCalledTimes(1)
        expect(err).toMatchInlineSnapshot(
            `[error: invalid input syntax for type uuid: "some-random-uuid"]`
        )
    })
})

describe('createFlightLog', () => {
    it('create a new flight log', async () => {
        const log: FlightLog = mockFlightLog()
        const newLog = await createFlightLog(log)
        expect(newLog).toMatchObject({
            ...log,
            date: new Date('2022-11-21T16:48:23.000Z'), // since UTC time
            UUID: expect.any(String),
        })
    })
})

describe('updateFlightLog', () => {
    it('should update a flight log', async () => {
        const UUID = '7bd69435-7eab-44c8-a4ae-9404df5ce140'
        const log: FlightLog = mockFlightLog({ UUID })
        const newLog = await updateFlightLog(log)
        expect(newLog).toMatchObject({
            ...log,
            date: new Date('2022-11-21T16:48:23.000Z'), // since UTC time
            UUID: UUID,
        })
    })
})

describe('deleteFlightLog', () => {
    it.skip('TBI', () => {})
})