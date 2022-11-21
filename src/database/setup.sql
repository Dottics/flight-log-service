-- noinspection SqlNoDataSourceInspectionForFile

-- ############################################################################
-- ### EXTENSIONS                                                           ###
-- ############################################################################

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE engine AS ENUM ('single', 'multi');
CREATE TYPE day AS ENUM ('day', 'night');

-- ############################################################################
-- ### FUNCTIONS / PROCEDURES                                               ###
-- ############################################################################

CREATE OR REPLACE FUNCTION set_update_date_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.update_date = now();
    RETURN NEW;
END;
$$
    LANGUAGE 'plpgsql';

-- ############################################################################
-- ### DROP TABLES                                                          ###
-- ############################################################################

DROP TABLE IF EXISTS tb_log;

-- ############################################################################
-- ### TABLES                                                               ###
-- ############################################################################


CREATE TABLE IF NOT EXISTS tb_log
(
    id                  SERIAL PRIMARY KEY,
    user_uuid           UUID          NOT NULL,
    aircraft_type       VARCHAR(32)   NOT NULL,
    registration        VARCHAR(256)  NOT NULL,
    pilot_in_command    VARCHAR(128)  NOT NULL,
    details             TEXT          NOT NULL,
    instrument_nav_aids VARCHAR(64)   NOT NULL,
    instrument_place    VARCHAR(64)   NOT NULL,
    instrument_actual   NUMERIC(5, 3) NOT NULL,
    instrument_fstd     NUMERIC(5, 3) NOT NULL,
    instructor_se       NUMERIC(5, 3) NOT NULL,
    instructor_me       NUMERIC(5, 3) NOT NULL,
    instructor_fstd     NUMERIC(5, 3) NOT NULL,
    fstd                NUMERIC(5, 3) NOT NULL,
    engine_type         engine        NOT NULL,
    day_type            day           NOT NULL,
    dual                NUMERIC(5, 3) NOT NULL,
    pic                 NUMERIC(5, 3) NOT NULL,
    picus               NUMERIC(5, 3) NOT NULL,
    copilot             NUMERIC(5, 3) NOT NULL,
    remarks             TEXT          NOT NULL,
    create_date         TIMESTAMP DEFAULT now(),
    update_date         TIMESTAMP DEFAULT now()
);
CREATE TRIGGER set_log_update_date
    AFTER UPDATE
    ON tb_log
    FOR EACH ROW
EXECUTE PROCEDURE set_update_date_column();

-- ############################################################################
-- ### JOINING TABLES                                                       ###
-- ############################################################################

-- ############################################################################
-- ### VIEWS                                                                ###
-- ############################################################################

-- ############################################################################
-- ### END                                                                  ###
-- ############################################################################


