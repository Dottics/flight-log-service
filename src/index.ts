import express, { Express } from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import { pool } from './database/db'
import { redis } from './database/redisDB'
import { home } from './handler/home'
import { error } from './handler/error'
import { permissionRequired } from './utils/permission-required'
import {
    getFlightLogs,
    getFlightLog,
    postFlightLog,
    putFlightLog,
    delFlightLog
} from './handler/flight-log'
import { getAircraftTypes } from './handler/aircraft-type'

// load the .env file
dotenv.config(process.env.NODE_ENV ? { path: '../.env.test' } : undefined)

/**
* checkDBConnections is a function called on start of the application to ensure
* the service is able to connect to the databases.
*/
const checkDBConnections = async () => {
    await pool.query('SELECT NOW()')
    await redis.connect()
    await redis.set('flightLog', 'connect')
}
// since we cannot have top-level awaits
checkDBConnections().then(() => {})

const app: Express = express()
const PORT = 3000

// enable to allow express to trust the x-forwarded-for header set by nginx
// and allows us to directly access the request ip field.
app.set('trust proxy', true)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* HEALTH CHECK */

app.get('/', home)

/* AIRCRAFT TYPE */

//a6900fa8-04fb-4de2-9a8a-3c174f3f6315
app.get('/aircraft-type', permissionRequired('9a8a'), getAircraftTypes)

/* FLIGHT LOG */

//328a0aae-d14a-443a-97f5-480eb4002c87
app.get('/log', permissionRequired('d14a'), getFlightLogs)
//5f107ca5-6653-4969-80fe-694cd2319861
app.get('/log/-', permissionRequired('80fe'), getFlightLog)
//dd7e4b14-d093-4220-b647-d2b30c5222d0
app.post('/log', permissionRequired('d093'), postFlightLog)
//cb79ad64-dc91-4aa2-a5e2-1b9d7dc9ccc1
app.put('/log/-', permissionRequired('ad64'), putFlightLog)
//ea35510b-d6b4-43b0-945d-d67772ea23ed
app.delete('/log/-', permissionRequired('ea23'), delFlightLog)

/**
 * Default Error Handler
 * */
app.use(error)

app.listen(PORT, () => {
    console.log(`
    express app is listening on port ${PORT}
    http://localhost:${PORT}
    `)
})
