CREATE TABLE IF NOT EXISTS tb_flight_log (
    id SERIAL PRIMARY KEY,
    user_uuid UUID NOT NULL,
    date TIMESTAMP DEFAULT now(),
    type VARCHAR(32),
    registration VARCHAR(64),
    pilot_in_command VARCAHR(256),
    details VARCAHR(256),

)