import { buildReq, buildRes } from 'test-utils'
import { getFlightLogs, getFlightLog, postFlightLog, putFlightLog, delFlightLog } from './flight-log'
import * as includesFlightLog from '../includes/flight-log'
import { mockFlightLog } from 'generate'

jest.mock('../includes/flight-log')
const mockSelectFlightLog = jest.spyOn(includesFlightLog, 'selectFlightLog')
const mockCreateFlightLog = jest.spyOn(includesFlightLog, 'createFlightLog')
const mockUpdateFlightLog = jest.spyOn(includesFlightLog, 'updateFlightLog')
const mockDeleteFlightLog = jest.spyOn(includesFlightLog, 'deleteFlightLog')

// clean up to clear all mocks
afterAll(() => jest.clearAllMocks())

describe('getFlightLogs', () => {
    it('should return 400 if no user UUID is provided', async () => {
        const req = buildReq()
        const res = buildRes()

        await getFlightLogs(req, res)
        
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
            {
              "errors": [
                ValidationError {
                  "argument": "userUUID",
                  "instance": {},
                  "message": "requires property "userUUID"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "userUUID"",
                },
              ],
              "message": "Bad Request",
            }
        `)
    })

    it(`should return 404 if no flight logs found for a user`, async () => {
        const randomUserUUID = 'd819ed2b-f2a0-4f3e-965e-963149bc98b9'
        mockSelectFlightLog.mockResolvedValueOnce([])
        const req = buildReq({ query: { userUUID: randomUserUUID }})
        const res = buildRes()

        await getFlightLogs(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
            {
              "errors": {
                "flightLogs": [
                  "not found",
                ],
              },
              "message": "Not Found",
            }
        `)
    })

    it(`should return all the user's flight logs`, async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const flightLogs = [
            mockFlightLog(),
            mockFlightLog(),
            mockFlightLog(),
        ]
        mockSelectFlightLog.mockResolvedValueOnce(flightLogs)
        const req = buildReq({ query: { userUUID }})
        const res = buildRes()

        await getFlightLogs(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json.mock.calls[0][0]).toMatchObject({
            message: 'user flight logs found',
            data: {
                flightLogs: flightLogs
            }
        })

    })
})

describe('getFlightLogs', () => {
    it('should validate the query parameters', async () => {
        const req = buildReq({ query: {}})
        const res = buildRes()

        await getFlightLog(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
            {
              "errors": [
                ValidationError {
                  "argument": "userUUID",
                  "instance": {},
                  "message": "requires property "userUUID"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "userUUID"",
                },
                ValidationError {
                  "argument": "UUID",
                  "instance": {},
                  "message": "requires property "UUID"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "UUID"",
                },
              ],
              "message": "Bad Request",
            }
        `)
    })

    it('should validate the query parameters', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const randomUUID = '2aaff843-d265-4a0e-b0ef-ae08c9d65041'
        mockSelectFlightLog.mockResolvedValueOnce([])
        const req = buildReq({ query: { userUUID, UUID: randomUUID }})
        const res = buildRes()

        await getFlightLog(req, res)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
            {
              "errors": {
                "flightLog": [
                  "not found",
                ],
              },
              "message": "Not Found",
            }
        `)
    })
    it('should validate the query parameters', async () => {
        const userUUID = '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e'
        const randomUUID = '2aaff843-d265-4a0e-b0ef-ae08c9d65041'
        mockSelectFlightLog.mockResolvedValueOnce([mockFlightLog()])
        const req = buildReq({ query: { userUUID, UUID: randomUUID }})
        const res = buildRes()

        await getFlightLog(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            message: expect.any(String),
            data: {
                flightLog: mockFlightLog()
            }
        })
    })
})

describe('postFlightLog', () => {
    it('should validate the data', async () => {
        const req = buildReq()
        const res = buildRes()

        await postFlightLog(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
            {
              "errors": [
                ValidationError {
                  "argument": "userUUID",
                  "instance": {},
                  "message": "requires property "userUUID"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "userUUID"",
                },
                ValidationError {
                  "argument": "date",
                  "instance": {},
                  "message": "requires property "date"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "date"",
                },
                ValidationError {
                  "argument": "aircraftType",
                  "instance": {},
                  "message": "requires property "aircraftType"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "aircraftType"",
                },
                ValidationError {
                  "argument": "registration",
                  "instance": {},
                  "message": "requires property "registration"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "registration"",
                },
                ValidationError {
                  "argument": "pilotInCommand",
                  "instance": {},
                  "message": "requires property "pilotInCommand"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "pilotInCommand"",
                },
                ValidationError {
                  "argument": "details",
                  "instance": {},
                  "message": "requires property "details"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "details"",
                },
                ValidationError {
                  "argument": "instrumentNavAids",
                  "instance": {},
                  "message": "requires property "instrumentNavAids"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentNavAids"",
                },
                ValidationError {
                  "argument": "instrumentPlace",
                  "instance": {},
                  "message": "requires property "instrumentPlace"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentPlace"",
                },
                ValidationError {
                  "argument": "instrumentActual",
                  "instance": {},
                  "message": "requires property "instrumentActual"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentActual"",
                },
                ValidationError {
                  "argument": "instrumentFSTD",
                  "instance": {},
                  "message": "requires property "instrumentFSTD"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentFSTD"",
                },
                ValidationError {
                  "argument": "instructorSE",
                  "instance": {},
                  "message": "requires property "instructorSE"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instructorSE"",
                },
                ValidationError {
                  "argument": "instructorME",
                  "instance": {},
                  "message": "requires property "instructorME"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instructorME"",
                },
                ValidationError {
                  "argument": "instructorFSTD",
                  "instance": {},
                  "message": "requires property "instructorFSTD"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instructorFSTD"",
                },
                ValidationError {
                  "argument": "FSTD",
                  "instance": {},
                  "message": "requires property "FSTD"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "FSTD"",
                },
                ValidationError {
                  "argument": "engineType",
                  "instance": {},
                  "message": "requires property "engineType"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "engineType"",
                },
                ValidationError {
                  "argument": "dayType",
                  "instance": {},
                  "message": "requires property "dayType"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "dayType"",
                },
                ValidationError {
                  "argument": "dual",
                  "instance": {},
                  "message": "requires property "dual"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "dual"",
                },
                ValidationError {
                  "argument": "PIC",
                  "instance": {},
                  "message": "requires property "PIC"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "PIC"",
                },
                ValidationError {
                  "argument": "PICUS",
                  "instance": {},
                  "message": "requires property "PICUS"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "PICUS"",
                },
                ValidationError {
                  "argument": "copilot",
                  "instance": {},
                  "message": "requires property "copilot"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "copilot"",
                },
                ValidationError {
                  "argument": "dayLandings",
                  "instance": {},
                  "message": "requires property "dayLandings"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "dayLandings"",
                },
                ValidationError {
                  "argument": "nightLandings",
                  "instance": {},
                  "message": "requires property "nightLandings"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "nightLandings"",
                },
                ValidationError {
                  "argument": "remarks",
                  "instance": {},
                  "message": "requires property "remarks"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "remarks"",
                },
              ],
              "message": "Bad Request",
            }
        `)
        expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should create a new flight log entry with correct data', async () => {
        const testFlightLog = mockFlightLog()
        mockCreateFlightLog.mockResolvedValueOnce(testFlightLog)
        const req = buildReq({ body: {
            ...testFlightLog,
            date: testFlightLog.date.toISOString()
        } })
        const res = buildRes()

        await postFlightLog(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({
            message: 'flight log saved',
            data: {
                flightLog: testFlightLog
            }
        })
        expect(res.json).toHaveBeenCalledTimes(1)
    })
})

describe('putFlightLog', () => {
    it('should validate the data', async () => {
        const req = buildReq()
        const res = buildRes()

        await putFlightLog(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
            {
              "errors": [
                ValidationError {
                  "argument": "userUUID",
                  "instance": {},
                  "message": "requires property "userUUID"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "userUUID"",
                },
                ValidationError {
                  "argument": "date",
                  "instance": {},
                  "message": "requires property "date"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "date"",
                },
                ValidationError {
                  "argument": "aircraftType",
                  "instance": {},
                  "message": "requires property "aircraftType"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "aircraftType"",
                },
                ValidationError {
                  "argument": "registration",
                  "instance": {},
                  "message": "requires property "registration"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "registration"",
                },
                ValidationError {
                  "argument": "pilotInCommand",
                  "instance": {},
                  "message": "requires property "pilotInCommand"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "pilotInCommand"",
                },
                ValidationError {
                  "argument": "details",
                  "instance": {},
                  "message": "requires property "details"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "details"",
                },
                ValidationError {
                  "argument": "instrumentNavAids",
                  "instance": {},
                  "message": "requires property "instrumentNavAids"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentNavAids"",
                },
                ValidationError {
                  "argument": "instrumentPlace",
                  "instance": {},
                  "message": "requires property "instrumentPlace"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentPlace"",
                },
                ValidationError {
                  "argument": "instrumentActual",
                  "instance": {},
                  "message": "requires property "instrumentActual"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentActual"",
                },
                ValidationError {
                  "argument": "instrumentFSTD",
                  "instance": {},
                  "message": "requires property "instrumentFSTD"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instrumentFSTD"",
                },
                ValidationError {
                  "argument": "instructorSE",
                  "instance": {},
                  "message": "requires property "instructorSE"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instructorSE"",
                },
                ValidationError {
                  "argument": "instructorME",
                  "instance": {},
                  "message": "requires property "instructorME"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instructorME"",
                },
                ValidationError {
                  "argument": "instructorFSTD",
                  "instance": {},
                  "message": "requires property "instructorFSTD"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "instructorFSTD"",
                },
                ValidationError {
                  "argument": "FSTD",
                  "instance": {},
                  "message": "requires property "FSTD"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "FSTD"",
                },
                ValidationError {
                  "argument": "engineType",
                  "instance": {},
                  "message": "requires property "engineType"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "engineType"",
                },
                ValidationError {
                  "argument": "dayType",
                  "instance": {},
                  "message": "requires property "dayType"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "dayType"",
                },
                ValidationError {
                  "argument": "dual",
                  "instance": {},
                  "message": "requires property "dual"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "dual"",
                },
                ValidationError {
                  "argument": "PIC",
                  "instance": {},
                  "message": "requires property "PIC"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "PIC"",
                },
                ValidationError {
                  "argument": "PICUS",
                  "instance": {},
                  "message": "requires property "PICUS"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "PICUS"",
                },
                ValidationError {
                  "argument": "copilot",
                  "instance": {},
                  "message": "requires property "copilot"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "copilot"",
                },
                ValidationError {
                  "argument": "dayLandings",
                  "instance": {},
                  "message": "requires property "dayLandings"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "dayLandings"",
                },
                ValidationError {
                  "argument": "nightLandings",
                  "instance": {},
                  "message": "requires property "nightLandings"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "nightLandings"",
                },
                ValidationError {
                  "argument": "remarks",
                  "instance": {},
                  "message": "requires property "remarks"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "remarks"",
                },
              ],
              "message": "Bad Request",
            }
        `)
        expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should update the flight log data', async () => {
        const testFlightLog = mockFlightLog({
            aircraftType: 'F210',
            pilotInCommand: 'J Bond'
        })
        mockUpdateFlightLog.mockResolvedValueOnce(testFlightLog)

        const req = buildReq({
            body: {
                ...testFlightLog,
                date: testFlightLog.date.toISOString()
            }
        })
        const res = buildRes()

        await putFlightLog(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({
            message: 'flight log updated',
            data: {
                flightLog: testFlightLog
            }
        })
        expect(res.json).toHaveBeenCalledTimes(1)
    })
})

describe('deleteFlightLog', () => {
    it('should validate the query parameters', async () => {
        const req = buildReq()
        const res = buildRes()

        await delFlightLog(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.status).toHaveBeenCalledTimes(1)

        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
            {
              "errors": [
                ValidationError {
                  "argument": "userUUID",
                  "instance": {},
                  "message": "requires property "userUUID"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "userUUID"",
                },
                ValidationError {
                  "argument": "UUID",
                  "instance": {},
                  "message": "requires property "UUID"",
                  "name": "required",
                  "path": [],
                  "property": "instance",
                  "stack": "instance requires property "UUID"",
                },
              ],
              "message": "Bad Request",
            }
        `)
        expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should parse and call the delete function with the correct parameters', async () => {
        const testFlightLog = mockFlightLog()
        const testQueryParams = {
            userUUID: '3d67cb98-0f32-4ae3-82e5-b6a18b45ea9c',
            UUID: '9f7ac955-c53a-43c1-b4ca-80ca43766e46',
        }
        mockDeleteFlightLog.mockResolvedValueOnce(testFlightLog)
        const req = buildReq({ query: testQueryParams })
        const res = buildRes()

        await delFlightLog(req, res)

        expect(mockDeleteFlightLog).toHaveBeenCalledWith(testQueryParams.userUUID, testQueryParams.UUID)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.status).toHaveBeenCalledTimes(1)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls[0][0]).toMatchObject({
            message: 'flight log deleted',
            data: { flightLog: testFlightLog }
        })
    })
})
