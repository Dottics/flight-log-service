-- ############################################################################
-- ### CLEAR TABLES                                                         ###
-- ############################################################################

DELETE FROM tb_log WHERE id > 0;

-- ############################################################################
-- ### LOG                                                                  ###
-- ############################################################################

ALTER SEQUENCE tb_log_id_seq RESTART WITH 1;
INSERT INTO tb_log (uuid, user_uuid, date, aircraft_type, registration, pilot_in_command, details, instrument_nav_aids,
                    instrument_place, instrument_actual, instrument_fstd, instructor_se, instructor_me, instructor_fstd,
                    fstd, engine_type, day_type, dual, pic, picus, copilot, day_landings, night_landings, remarks)
VALUES ('3d9c367a-98bd-43e1-8f6c-28bddd7f56d1', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-02-04', 'C150', 'ZS-NRX', 'W Jacoby', 'Ex4', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0, 0, 0, 0, 0, 0, ''),
       ('a0f31b34-6319-4be3-99b3-52dd9d7cf935', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-02-16', 'JABI', 'ZU-EAE', 'W Jacoby', 'Ex7,8', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0.9, 0, 0, 0, 0, 0, ''),
       ('38354b30-d615-4d57-8752-1b1f1ef37527', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-04-14', 'C150', 'ZS-NRX', 'SELF', 'Ex12,13', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 1.1, 0, 0, 0, 0, 0, ''),
       ('c43d041b-2a23-4052-8e2c-c5a1b41cdba1', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2007-04-13', 'C150', 'ZS-NRX', 'SELF', 'Ex12,13', '', '', 0, 0, 0, 0, 0, 0, 'single', 'day', 0, 0.8, 0, 0, 0, 0, ''),
       ('566b8e0d-da2e-4524-80db-573ac9dcd9b7', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-11-09', 'C425', 'V5-WAX', 'C Roets', 'FYWE-FYLZ', '', '', 0, 0, 0, 0, 0, 0, 'multi', 'day', 0, 0, 0, 1.5, 1, 0, ''),
       ('7bd69435-7eab-44c8-a4ae-9404df5ce140', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-11-27', 'JABI', 'V5-WAX', 'SELF', 'Ex15,16,17 (S Huhle)', '', '', 0, 0, 1.1, 0, 0, 0, 'single', 'day', 0, 0, 0, 0, 1, 0, ''),
       ('cf55a44e-e875-4cbb-aef9-d22dd156c3e7', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2013-12-23', 'F406', 'V5-DHL', 'B Graupe', 'FYWE-FAOR', 'ILS/VOR', 'JSV', 1, 0, 0, 0, 0, 0, 'multi', 'night', 0, 0, 0, 3.2, 0, 1, ''),
       ('ac68887b-c2cf-43d2-bcae-8b25f7ab17f9', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2014-12-03', 'C441', 'V5-NRS', 'F Hugo', 'Conversion', '', '', 0, 0, 0, 0, 0, 0, 'multi', 'day', 1.2, 0, 0, 0, 0, 0, ''),
       ('17236ccf-7729-485e-9e1a-b45258b3357c', '1ca0ae68-1bf2-4a18-a819-be5aa80ed98e', '2018-12-10', 'A320', 'B-HSM', 'HLS Wong', 'VHHH-ZSAM', 'ILS', 'XMN', 0.2, 0, 0, 0, 0, 0, 'multi', 'day', 0, 0, 0, 1.5, 0, 1, '');

-- ############################################################################
-- ### END                                                                  ###
-- ############################################################################
