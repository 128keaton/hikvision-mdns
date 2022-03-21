module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageDirectory: 'test/coverage',
    testRegex: '/test/hikvision.test.ts',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
};
