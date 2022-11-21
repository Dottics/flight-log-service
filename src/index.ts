import express, { Express } from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import { home } from './handler/home'
import { error } from './handler/error'
import { permissionRequired } from './utils/permission-required'

// load the .env file
dotenv.config()

const app: Express = express()
const PORT = 3000

// enable to allow express to trust the x-forwarded-for header set by nginx
// and allows us to directly access the request ip field.
app.set('trust proxy', true)

app.use(permissionRequired)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', home)

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
