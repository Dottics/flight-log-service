import { buildReq, buildRes } from 'test-utils'
import { getFlightLogs, getFlightLog } from './flight-log'
import * as includesFlightLog from '../includes/flight-log'
import { selectFlightLog } from '../includes/flight-log';
import { mockFlightLog } from 'generate'

jest.mock('../includes/flight-log')
const mockSelectFlightLog = jest.spyOn(includesFlightLog, 'selectFlightLog')

// clean up to clear all mocks
afterAll(() => jest.clearAllMocks())

describe('getFlightLogs', () => {
    it('should return 400 if no user UUID is provided', async () => {
        const req = buildReq()
        const res = buildRes()

        await getFlightLogs(req, res)
        
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
            [
              {
                "errors": [
                  ValidationError {
                    "argument": "userUUID",
                    "instance": {},
                    "message": "requires property "userUUID"",
                    "name": "required",
                    "path": [],
                    "property": "instance",
                    "schema": {
                      "properties": {
                        "userUUID": {
                          "$ref": "/RegexSchema",
                          "type": "string",
                        },
                      },
                      "required": [
                        "userUUID",
                      ],
                      "type": "object",
                    },
                    "stack": "instance requires property "userUUID"",
                  },
                ],
                "message": "Bad Request",
              },
            ]
        `)
    })

    it(`should return 404 if no flight logs found for a user`, async () => {
        const randomUserUUID = 'd819ed2b-f2a0-4f3e-965e-963149bc98b9'
        mockSelectFlightLog.mockResolvedValueOnce([])
        const req = buildReq({ query: { userUUID: randomUserUUID }})
        const res = buildRes()

        await getFlightLogs(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
            [
              {
                "errors": {
                  "flightLogs": [
                    "not found",
                  ],
                },
                "message": "Not Found",
              },
            ]
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
        expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
            [
              {
                "errors": [
                  {
                    "userUUID": "required",
                  },
                  {
                    "UUID": "required",
                  },
                ],
                "message": "Bad Request",
              },
            ]
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
        expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
            [
              {
                "errors": {
                  "flightLog": [
                    "not found",
                  ],
                },
                "message": "Not Found",
              },
            ]
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