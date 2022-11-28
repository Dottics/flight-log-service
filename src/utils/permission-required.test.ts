import { permissionRequired } from './permission-required'
import { buildReq, buildRes, buildNext, buildRedisJWT } from 'test-utils'
import { redis } from 'database/redisDB'

beforeAll(() => {
    jest.clearAllMocks()
})

afterEach(() => {
    jest.resetAllMocks()
})

describe('permissionRequired', () => {
    it('should log the request route', async () => {
        const testToken = await buildRedisJWT()

        const req = buildReq({ url: 'TEST_ROUTE', headers: { 'X-User-Token': testToken } })
        const res = buildRes()
        const next = buildNext()
        // mock the console.log function to supress the test logs
        console.log = jest.fn(() => {})
        jest.spyOn(global.console, 'log')

        const p = permissionRequired('dc16')
        await p(req, res, next)

        expect(console.log).toHaveBeenCalledWith('=> dc16:TEST_ROUTE')
        expect(console.log).toHaveBeenCalledTimes(1)
    })

    it('should allow a request to pass if the user has permission', async () => {
        const testToken = await buildRedisJWT()

        const req = buildReq({ url: 'TEST_ROUTE', headers: { 'X-User-Token': testToken } })
        const res = buildRes()
        const next = buildNext()
        // mock the console.log function to supress the test logs
        // console.log = jest.fn(() => {})
        jest.spyOn(global.console, 'log')

        const p = permissionRequired('TEST2')
        await p(req, res, next)

        expect(next).toHaveBeenCalledWith(/* nothing */)
        expect(next).toHaveBeenCalledTimes(1)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
    })

    it('should return 401 if the token cannot be decoded', async () => {
        const req = buildReq({ url: 'TEST_ROUTE', headers: { 'X-User-Token': 'TOKEN_CANNOT_BE_DECODED' } })
        const res = buildRes()
        const next = buildNext()
        // mock the console.log function to supress the test logs
        console.log = jest.fn(() => {})
        jest.spyOn(global.console, 'log')
        console.error = jest.fn(() => {})
        jest.spyOn(global.console, 'error')

        const p = permissionRequired('TEST2')
        await p(req, res, next)

        expect(next).not.toHaveBeenCalled()

        expect(console.error).toHaveBeenCalledWith("Unable to decode token TOKEN_CANNOT_BE_DECODED: JsonWebTokenError: jwt malformed")
        expect(console.error).toHaveBeenCalledTimes(1)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.status).toHaveBeenCalledTimes(1)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unauthorised',
            errors: { token: ['invalid'] }
        })
    })

    it('should return 401 if user has no permissions', async () => {
        const testToken = await buildRedisJWT({permission: []})
        const req = buildReq({ url: 'TEST_ROUTE', headers: { 'X-User-Token': testToken } })
        const res = buildRes()
        const next = buildNext()
        // mock the console.log function to supress the test logs
        console.log = jest.fn(() => {})
        jest.spyOn(global.console, 'log')

        const p = permissionRequired('TEST2')
        await p(req, res, next)

        expect(next).not.toHaveBeenCalled()

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.status).toHaveBeenCalledTimes(1)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unauthorised',
            errors: { session: ['invalid'] }
        })

    })

    it('should return 403 informing the user need permission', async () => {
        const testToken = await buildRedisJWT()

        const req = buildReq({ url: 'TEST_ROUTE', headers: { 'X-User-Token': testToken } })
        const res = buildRes()
        const next = buildNext()
        // mock the console.log function to supress the test logs
        console.log = jest.fn(() => {})
        jest.spyOn(global.console, 'log')

        const p = permissionRequired('OTHER_PERMISSION_CODE')
        await p(req, res, next)

        expect(next).not.toHaveBeenCalled()

        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.status).toHaveBeenCalledTimes(1)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Forbidden',
            errors: { permission: ['Please ensure you have permission'] }
        })
    })
})