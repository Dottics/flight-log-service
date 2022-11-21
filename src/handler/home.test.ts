import { buildReq, buildRes } from 'test-utils'
import { home } from './home'

describe('home handler', () => {
    it('should return health check', () => {
        const req = buildReq()
        const res = buildRes()

        home(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'welcome to the flight-log-service'
        })
        expect(res.json).toHaveBeenCalledTimes(1)
    })
})