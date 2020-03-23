// TODO: remove disable
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (config) => {
    config.set({
        mutator: {
            name: 'typescript',
            excludedMutations: [
                'StringLiteral',
            ],
        },
        packageManager: 'npm',
        reporters: [
            'html',
            'clear-text', 'progress',
        ],
        testRunner: 'jest',
        coverageAnalysis: 'off',
        tsconfigFile: 'tsconfig.json',
        mutate: [
            'src/service/*.ts',
        ],
        files: [
            'src/**/*.ts',
            'test/**/*.ts',
            'jest.config.js',
            '.env',
        ],
        maxConcurrentTestRunners: 3,
    });
};
