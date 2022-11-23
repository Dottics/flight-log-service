import { buildReq, buildRes } from 'test-utils'
import { getFlightLogs } from './flight-log'
import * as includesFlightLog from '../includes/flight-log'
import { selectFlightLog } from '../includes/flight-log';
import { mockFlightLog } from 'generate'

jest.mock('../includes/flight-log')
const mockSelectFlightLog = jest.spyOn(includesFlightLog, 'selectFlightLog')

describe('getFlightLogs', () => {
    it('should return 400 if no user UUID is provided', async () => {
        const req = buildReq()
        const res = buildRes()

        await getFlightLogs(req, res)
        
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
            [
              {
                "errors": {
                  "userUUID": [
                    "is required",
                  ],
                },
                "message": "Bad Request",
              },
            ]
        `)

    })
    it(`should return 404 if no flight logs found for a user`, async () => {
        mockSelectFlightLog.mockResolvedValueOnce([])
        const req = buildReq({ query: { userUUID: '' }})
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