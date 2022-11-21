import { error } from './error'
import { buildRes, buildReq, buildNext } from 'test-utils'

beforeAll(() => {
    jest.clearAllMocks()
})

describe('error handler', () => {
    const req= buildReq()
    const res = buildRes()
    const next = buildNext()

    test('error handler to send a default error response', () => {
        const errorMessage = 'test error message'
        const err = new Error(errorMessage)

        error(err, req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({
            message: err.message,
            stack: err.stack
        })
        expect(res.json).toHaveBeenCalledTimes(1)
    })
})