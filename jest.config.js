module.exports = {
  "setupFilesAfterEnv": ["<rootDir>/src/testSetup.js"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ]
}