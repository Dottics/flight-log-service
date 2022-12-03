import { rePopulateDB } from 'test-utils'
import {selectAircraftType, selectAircraftTypeID} from './aircraft-type'

beforeAll(async () => {
    await rePopulateDB()
})

// clean up after all tests
afterAll(() => jest.clearAllMocks())

describe('selectAircraftType', () => {
    it('should return all aircraft types', async () => {
        const types = await selectAircraftType()
        expect(types.length).toBeGreaterThanOrEqual(3)
    })

    it('should an empty array of no match for UUID', async () => {
        const testRandomUUID = '57991734-720e-40fc-8bd9-43bbd64cca0d'
        const types = await selectAircraftType(testRandomUUID)
        expect(types).toHaveLength(0)
    })

    it('should return a single aircraft type for a UUID match', async () => {
        // from default test data
        const UUID = '79a20304-684c-44b7-9545-134472196318'
        const rows = await selectAircraftType(UUID)
        expect(rows).toHaveLength(1)
        expect(rows[0]).toMatchObject({
            UUID,
            name: 'C182',
            description: '',
        })
    })
})

describe('selectAircraftTypeID', () => {
    it('should return null if no aircraft type found by UUID', async () => {
        const testRandomUUID = '93777fb5-3c45-41cf-8f17-13794200c186'
        const ID = await selectAircraftTypeID(testRandomUUID)
        expect(ID).toBeNull()
    })

    it('should return the id of the aircraft type when found by UUID', async () => {
        const testUUID = 'fe967f69-2609-4800-aa30-13fb2f3e74dc'
        const ID = await selectAircraftTypeID(testUUID)
        expect(ID).toEqual(4)
    })
})