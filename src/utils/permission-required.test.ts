import { permissionRequired } from './permission-required'
import { buildReq, buildRes, buildNext } from 'test-utils'

beforeAll(() => {
    jest.clearAllMocks()
})

afterAll(() => {
    jest.resetAllMocks()
})

describe('permissionRequired', () => {
    it('should log the request route', () => {
        const req = buildReq({ url: 'TEST_ROUTE' })
        const res = buildRes()
        const next = buildNext()
        // mock the console.log function to supress the test logs
        console.log = jest.fn(() => {})
        jest.spyOn(global.console, 'log')


        permissionRequired('code')(req, res, next)

        expect(next).toHaveBeenCalledWith(/* nothing */)
        expect(next).toHaveBeenCalledTimes(1)

        expect(console.log).toHaveBeenCalledWith('=> code:TEST_ROUTE')
        expect(console.log).toHaveBeenCalledTimes(1)
    })
})