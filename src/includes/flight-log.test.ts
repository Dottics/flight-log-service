import { pool } from '../database/db'
import { loadEnv, testResolve, rePopulateDB } from 'test-utils'
import { mockFlightLog } from 'generate'
import { FlightLog, selectFlightLog, createFlightLog } from './flight-log'

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
        const logs = await selectFlightLog('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '1200')
        expect(logs).toHaveLength(0)
    })

    it('should read all flight logs from the database', async () => {
        const logs = await selectFlightLog('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e')
        expect(logs.length).toBeGreaterThanOrEqual(5)
        expect(logs[0]).toMatchObject({
            aircraft_type: "C150",
            copilot: "0.000",
            create_date: expect.any(Date),
            date: new Date('2007-02-03T22:00:00.000Z'),
            day_landings: "0",
            day_type: "day",
            details: "Ex4",
            dual: "0.000",
            engine_type: "single",
            fstd: "0.000",
            id: 1,
            instructor_fstd: "0.000",
            instructor_me: "0.000",
            instructor_se: "0.000",
            instrument_actual: "0.000",
            instrument_fstd: "0.000",
            instrument_nav_aids: "",
            instrument_place: "",
            night_landings: "0",
            pic: "0.000",
            picus: "0.000",
            pilot_in_command: "W Jacoby",
            registration: "ZS-NRX",
            remarks: "",
            update_date: expect.any(Date),
            user_uuid: "1ca0ae68-1bf2-4a18-a819-be5aa80ed98e",
        })
    })

    it('should read a specific flight log from the database', async () => {
        const logs = await selectFlightLog('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '1')
        expect(logs).toHaveLength(1)
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
        expect(newLog).toMatchInlineSnapshot(`
            {
              "FSTD": "0.000",
              "PIC": "0.000",
              "PICUS": "0.000",
              "copilot": "0.000",
              "date": 2022-11-21T16:48:23.000Z,
              "dayLandings": "0",
              "dayType": "day",
              "details": "HKG-CPT",
              "dual": "0.000",
              "engineType": "single",
              "instructorFSTD": "0.000",
              "instructorME": "0.000",
              "instructorSE": "0.000",
              "instrumentActual": "1.000",
              "instrumentFSTD": "0.000",
              "instrumentNavAids": "ivl",
              "instrumentPlace": "jvl",
              "nightLandings": "1",
              "pilotInCommand": "SELF",
              "registration": "ZXYIOU",
              "remarks": "weather conditions not ideal",
              "type": undefined,
              "userUUID": "54f94bbc-1394-4796-a5a0-7e847afbb813",
            }
        `)
    })
})

describe('updateFlightLog', () => {
    it.skip('should update a flight log', () => {})
})

describe('deleteFlightLog', () => {
    it.skip('TBI', () => {})
})