const nextJest = require("next/jest");

/**@type {import('jest').Config} */
const createJestConfig = nextJest({
  //provide the path to your next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

//Add any custom config to be passed to jest

const config = {
  coverageProvider: "v8",
  testEnviroment: "jsdom",
  //Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};


//createJestConfig is exported this way to ensure that nextjs is properly configured
module.exports = createJestConfig(config);
 