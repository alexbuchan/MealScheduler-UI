module.exports = {
  "setupFilesAfterEnv": ["<rootDir>/src/testSetup.js"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/testUtils/__mocks__/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy"
  }
}