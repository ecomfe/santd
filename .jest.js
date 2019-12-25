/**
 * @file jest config file
 **/

module.exports = {
    // setupFiles: ['./tests/setup.js'],
    moduleFileExtensions: ['js'],
    modulePathIgnorePatterns: ['/site/'],
    testPathIgnorePatterns: ['/node_modules/', 'node'],
    transform: {
        '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest'
    },
    testRegex: '/src/.*/__tests__/(.*)\\.js$',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        'santd': '<rootDir>/src/index.js',
        '^san$': 'san/dist/san.spa.js'
    },
    transformIgnorePatterns: [
        '/dest/',
        'node_modules/[^/]+?/(?!(es|node_modules)/)'
    ]
};
