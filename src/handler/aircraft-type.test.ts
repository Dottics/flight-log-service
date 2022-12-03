import { buildReq, buildRes } from 'test-utils'
import { mockAircraftType } from 'generate'
import { getAircraftTypes } from './aircraft-type'

import * as includesAircraftType from '../includes/aircraft-type'

jest.mock('../includes/aircraft-type')
const mockSelectAircraftType = jest.spyOn(includesAircraftType, 'selectAircraftType')

describe('getAircraftType', () => {
    it('should return all aircraft types', async () => {
        mockSelectAircraftType.mockResolvedValueOnce([
            mockAircraftType(),
            mockAircraftType(),
            mockAircraftType(),
            mockAircraftType(),
        ])
        const req = buildReq()
        const res = buildRes()

        await getAircraftTypes(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.status).toHaveBeenCalledTimes(1)

        expect(res.json).toHaveBeenCalledWith({
            message: 'aircraft types found',
            data: {
                aircraftTypes: [
                    mockAircraftType(),
                    mockAircraftType(),
                    mockAircraftType(),
                    mockAircraftType(),
                ]
            }
        })
    })
})