import { testResolve, rePopulateDB } from 'test-utils'
import { mockFlightLog, mockDBFlightLog } from 'generate'
import {
    FlightLog,
    selectFlightLog,
    createFlightLog,
    updateFlightLog,
    deleteFlightLog, DBFlightLog
} from './flight-log'

beforeAll(async () => {
    await rePopulateDB()
})

// clean up after all tests
afterAll(() => jest.clearAllMocks())

describe('FlightLog', () => {
    it('should have public properties', () => {
        const f = mockFlightLog()

        expect(f.userUUID).toEqual('54f94bbc-1394-4796-a5a0-7e847afbb813')
        expect(f.date.toISOString()).toEqual('2022-11-21T18:48:23.000Z')
        expect(f.aircraftType).toEqual('A310')
        expect(f.registration).toEqual('ZXYIOU')
    })
})

describe('selectFlightLog', () => {
    it('should return an empty array if the user has no flight logs', async () => {
        const randomUserUUID = 'baf46eac-7a11-4870-b0ec-c699cf794c41'
        const logs = await selectFlightLog(randomUserUUID)
        expect(logs).toHaveLength(0)
    })

    it('should return an empty array if the specific flight log does not exist', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const randomFlightLogUUID = '5a0de280-b365-4875-8101-1e235aa21eae'
        const logs = await selectFlightLog(userUUID, randomFlightLogUUID)
        expect(logs).toHaveLength(0)
    })

    it('should read all flight logs from the database', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const logs = await selectFlightLog(userUUID)
        expect(logs.length).toBeGreaterThanOrEqual(5)
        expect(logs[0]).toMatchObject({
//            aircraftType: 'C150',
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
            aircraftType: 'C310',
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
    it('should error violates aricraft type foreign key constraint', async () => {
        const log: DBFlightLog = mockDBFlightLog({
            aircraft_type_id: 127,
        })
        const err = await createFlightLog(log).catch(testResolve)
        expect(err).toMatchInlineSnapshot(
            `[error: insert or update on table "tb_log" violates foreign key constraint "tb_log_aircraft_type_id_fkey"]`
        )
    })

    it('create a new flight log', async () => {
        const log: DBFlightLog = mockDBFlightLog()
        const newLog = await createFlightLog(log)
        expect(newLog).toMatchObject({
            id: expect.any(Number)
        })
    })
})

describe('updateFlightLog', () => {
    it('should error violates aricraft type foreign key constraint', async () => {
        const UUID = '7bd69435-7eab-44c8-a4ae-9404df5ce140'
        const log: DBFlightLog = mockDBFlightLog({
            uuid: UUID,
            aircraft_type_id: 127,
        })
        const err = await updateFlightLog(log).catch(testResolve)
        expect(err).toMatchInlineSnapshot(
            `[error: insert or update on table "tb_log" violates foreign key constraint "tb_log_aircraft_type_id_fkey"]`
        )
    })

    it('should update a flight log', async () => {
        const UUID = '7bd69435-7eab-44c8-a4ae-9404df5ce140'
        const log: DBFlightLog = mockDBFlightLog({ uuid: UUID })
        const newLog = await updateFlightLog(log)
        expect(newLog).toMatchObject({
            id: expect.any(Number)
        })
    })
})

describe('deleteFlightLog', () => {
    it('should return false if the user does not have a flight log', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const randomUUID = 'cf3bee16-0a56-40b6-b93f-b30245ce11ec'

        let b = await deleteFlightLog(userUUID, randomUUID)
        expect(b).toBe(false)
    })
    it('should delete a flight log from the database', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const UUID = '566b8e0d-da2e-4524-80db-573ac9dcd9b7'
        let logs = await selectFlightLog(userUUID, UUID)
        expect(logs).toHaveLength(1)

        let b = await deleteFlightLog(userUUID, UUID)
        expect(b).toBe(true)

        logs = await selectFlightLog(userUUID, UUID)
        expect(logs).toHaveLength(0)
    })
})