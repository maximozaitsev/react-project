export const preset = 'ts-jest';
export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
export const moduleNameMapper = {
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
};
export const collectCoverage = true;
export const coverageDirectory = 'coverage';
export const coverageThreshold = {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
};
