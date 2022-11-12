const path = require('path');

module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', __dirname],
  modulePathIgnorePatterns: [path.join(__dirname, 'dist')]
};