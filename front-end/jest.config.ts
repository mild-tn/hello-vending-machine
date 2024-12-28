module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
      babelConfig: true,
      diagnostics: false,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/server/"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  testMatch: ["**/*.test.tsx", "**/*.test.ts", "**/*.spec.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
