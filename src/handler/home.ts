import {Request, Response} from 'express'

/**
 * home is the handler for the root of the service and also serves as the health
 * check route for the service.
 * */
const home = (req: Request, res: Response) => {
    res.json({message: 'welcome to the flight-log-service'})
}

export {
    home
}
