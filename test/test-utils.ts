//import { Request, Response} from 'express'
import jwt, {SignOptions} from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import path from 'path'
import { Pool } from 'pg'
import { redis } from '../src/database/redisDB'

function loadEnv() {
    dotenv.config({ path: path.join(__dirname, '../.env.test'), debug: true })
}
loadEnv()

function buildReq(overrides = {}) {
    return {
        body: {},
        params: {},
        query: {},
        ...overrides
    } as any
}

function buildRes(overrides = {}) {
    const res: any = {
        json: jest.fn(() => res).mockName('json'),
        status: jest.fn(() => res).mockName('status'),
        ...overrides,
    }
    return res
}

function buildNext(impl?: any) {
    return jest.fn(impl).mockName('next')
}

async function testResolve(e: Error): Promise<Error> {
    return Promise.resolve(e)
}

/**
* clearData clears all the database tables.
*/
const clearData = async () => {
    const pool = new Pool()
    await pool.query('DELETE FROM tb_log WHERE id > 0;')
    await pool.end()
}



/**
* setDefaultData populates the database with some default data.
*/
const setDefaultData = async () => {
    const pool = new Pool()
    await pool.query(`
    ALTER SEQUENCE tb_aircraft_type_id_seq RESTART WITH 1;
    INSERT INTO tb_aircraft_type (uuid, name, description)
    VALUES ('9ab2bde3-0edc-418f-8b24-c1f7c741a0df', 'A320', ''),
    ('26469598-dad3-45cc-9474-4d677a5661d9', 'A321', ''),
    ('dbc4a413-00e2-4525-b3f3-565b067db6b8', 'BE35', ''),
    ('fe967f69-2609-4800-aa30-13fb2f3e74dc', 'C150', ''),
    ('79a20304-684c-44b7-9545-134472196318', 'C182', ''),
    ('288303a5-3070-4815-81de-05d1efa99621', 'C210', ''),
    ('c405fd7a-b64b-4eba-8f02-0ebd2873b9b4', 'C310', ''),
    ('f926ded4-b219-4c59-b648-99feeca5959f', 'C425', ''),
    ('8d5ae427-75bf-49db-9aa9-d246f21ecfdc', 'C441', ''),
    ('97feccb0-5d56-4c80-89f2-3945e648ad76', 'DV20', ''),
    ('0580336f-ceb9-4e3b-a112-e824396a53af', 'F406', ''),
    ('454ee2c6-b6f8-42b2-a4c1-37edbb38182a', 'FNPT2', ''),
    ('7174b634-a7e4-4d51-a8e9-ac73cfff0475', 'JABI', ''),
    ('330c4f96-c481-4484-a366-1d4d6476d635', 'RJ85', '');

    ALTER SEQUENCE tb_log_id_seq RESTART WITH 1;
    INSERT INTO tb_log (uuid, user_uuid, date, aircraft_type_id, registration, pilot_in_command, details,
    instrument_nav_aids,
    instrument_place, instrument_actual, instrument_fstd, instructor_se, instructor_me, instructor_fstd,
    fstd, engine_type, day_type, dual, pic, picus, copilot, day_landings, night_landings, remarks)
    VALUES ('3d9c367a-98bd-43e1-8f6c-28bddd7f56d1', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-02-04', 4, 'ZS-NRX',
    'W Jacoby', 'Ex4', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0, 0, 0, 0, 0, 0, ''),
    ('a0f31b34-6319-4be3-99b3-52dd9d7cf935', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-02-16', 12, 'ZU-EAE',
    'W Jacoby', 'Ex7,8', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0.9, 0, 0, 0, 0, 0, ''),
    ('38354b30-d615-4d57-8752-1b1f1ef37527', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-04-14', 4, 'ZS-NRX',
    'SELF', 'Ex12,13', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 1.1, 0, 0, 0, 0, 0, ''),
    ('c43d041b-2a23-4052-8e2c-c5a1b41cdba1', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-04-13', 4, 'ZS-NRX',
    'SELF', 'Ex12,13', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0, 0.8, 0, 0, 0, 0, ''),
    ('566b8e0d-da2e-4524-80db-573ac9dcd9b7', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-11-09', 7, 'V5-WAX',
    'C Roets', 'FYWE-FYLZ', '', '', 0, 0, 0, 0, 0, 0, 'multi', 'day', 0, 0, 0, 1.5, 1, 0, ''),
    ('7bd69435-7eab-44c8-a4ae-9404df5ce140', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-11-27', 12, 'V5-WAX',
    'SELF', 'Ex15,16,17 (S Huhle)', '', '', 0, 0, 1.1, 0, 0, 0, 'single', 'day', 0, 0, 0, 0, 1, 0, ''),
    ('cf55a44e-e875-4cbb-aef9-d22dd156c3e7', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-12-23', 10, 'V5-DHL',
    'B Graupe', 'FYWE-FAOR', 'ILS/VOR', 'JSV', 1, 0, 0, 0, 0, 0, 'multi', 'night', 0, 0, 0, 3.2, 0, 1, ''),
    ('ac68887b-c2cf-43d2-bcae-8b25f7ab17f9', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2014-12-03', 8, 'V5-NRS',
    'F Hugo', 'Conversion', '', '', 0, 0, 0, 0, 0, 0, 'multi', 'day', 1.2, 0, 0, 0, 0, 0, ''),
    ('17236ccf-7729-485e-9e1a-b45258b3357c', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2018-12-10', 1, 'B-HSM',
    'HLS Wong', 'VHHH-ZSAM', 'ILS', 'XMN', 0.2, 0, 0, 0, 0, 0, 'multi', 'day', 0, 0, 0, 1.5, 0, 1, '');
    `)
    await pool.end()
}



async function rePopulateDB() {
    await clearData()
    await setDefaultData()
}

/**
* buildRedisJWT sign's a JWT token, and stores the token in the redis database.
* then returns the token.
*/
const buildRedisJWT = async (data?: any): Promise<string> => {
    await redis.connect()
    const d = {
        //exp: Math.floor(Date.now() / 1000) + (60 * 60),
        created: new Date().toISOString(),
        'u-id': 'foobar',
        's-id': 'foobar-session',
        permission: ['TEST1', 'TEST2', 'TEST3'],
        ...data,
    }
    const secret = process.env.JWT_CODE ?? ''
    const options = {
        algorithm: process.env.JWT_ALGORITHM ?? 'HS256'
    } as SignOptions

    // sign the token
    const token = jwt.sign(d, secret, options)
    // set the redis token
    await redis.set(d['s-id'], JSON.stringify(d))
    await redis.quit()
    return token
}

export {
//    loadEnv,
    buildReq,
    buildRes,
    buildNext,
    testResolve,
    rePopulateDB,
    buildRedisJWT
}