import { Request, Response } from 'express'
import { selectAircraftType } from '../includes/aircraft-type'

/**
* getAircraftTypes returns all the aircraft types.
*/
const getAircraftTypes = async (req: Request, res: Response) => {
    const aircraftTypes = await selectAircraftType()
    res.status(200).json({
        message: 'aircraft types found',
        data: {
            aircraftTypes
        }
    })
}

export {
    getAircraftTypes,
}