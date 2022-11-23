import * as dotenv from 'dotenv'
import path from 'path'
import { Pool } from 'pg'

function loadEnv() {
    dotenv.config({ path: path.join(__dirname, '../.env.test'), debug: true })
}

function buildReq(overrides = {}) {
    return {
        body: {},
        params: {},
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
    ALTER SEQUENCE tb_log_id_seq RESTART WITH 1;
    INSERT INTO tb_log (user_uuid, date, aircraft_type, registration, pilot_in_command, details, instrument_nav_aids,
    instrument_place, instrument_actual, instrument_fstd, instructor_se, instructor_me, instructor_fstd,
    fstd, engine_type, day_type, dual, pic, picus, copilot, day_landings, night_landings, remarks)
    VALUES ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-02-04', 'C150', 'ZS-NRX', 'W Jacoby', 'Ex4', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0, 0, 0, 0, 0, 0, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-02-16', 'JABI', 'ZU-EAE', 'W Jacoby', 'Ex7,8', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0.9, 0, 0, 0, 0, 0, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-04-14', 'C150', 'ZS-NRX', 'SELF', 'Ex12,13', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 1.1, 0, 0, 0, 0, 0, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-04-13', 'C150', 'ZS-NRX', 'SELF', 'Ex12,13', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0, 0.8, 0, 0, 0, 0, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-11-09', 'C425', 'V5-WAX', 'C Roets', 'FYWE-FYLZ', '', '', 0, 0, 0, 0, 0, 0, 'multi', 'day', 0, 0, 0, 1.5, 1, 0, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-11-27', 'JABI', 'V5-WAX', 'SELF', 'Ex15,16,17 (S Huhle)', '', '', 0, 0, 1.1, 0, 0, 0, 'single', 'day', 0, 0, 0, 0, 1, 0, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-12-23', 'F406', 'V5-DHL', 'B Graupe', 'FYWE-FAOR', 'ILS/VOR', 'JSV', 1, 0, 0, 0, 0, 0, 'multi', 'night', 0, 0, 0, 3.2, 0, 1, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2014-12-03', 'C441', 'V5-NRS', 'F Hugo', 'Conversion', '', '', 0, 0, 0, 0, 0, 0, 'multi', 'day', 1.2, 0, 0, 0, 0, 0, ''),
    ('1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2018-12-10', 'A320', 'B-HSM', 'HLS Wong', 'VHHH-ZSAM', 'ILS', 'XMN', 0.2, 0, 0, 0, 0, 0, 'multi', 'day', 0, 0, 0, 1.5, 0, 1, '');
    `)
    await pool.end()
}



async function rePopulateDB() {
    await clearData()
    await setDefaultData()
}

export {
    loadEnv,
    buildReq,
    buildRes,
    buildNext,
    testResolve,
    rePopulateDB
}