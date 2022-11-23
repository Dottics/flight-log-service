const path = require('path');

module.exports = {
    // preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', __dirname, path.join(__dirname, 'test')],
    modulePathIgnorePatterns: [path.join(__dirname, 'dist')],
    // setupFiles: ['<rootDir>/test/setup'],
};
