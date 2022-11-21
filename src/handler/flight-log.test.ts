import { buildReq, buildRes } from 'test-utils'

import { getFlightLogs } from 'handler/flight-log'

describe('getFlightLogs', () => {
    it('should return 400 if no user UUID is provided', () => {
        const req = buildReq()
        const res = buildRes()

        
    })
    it.skip(`should return 404 if no flight logs found`, () => {})
    it(`should return all the user's flight logs`, () => {
        const req = buildReq()
        const res = buildRes()


    })
})