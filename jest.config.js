const config = {
    "name": "library",
    "version": "1.0.0",
    "verbose": true,
    moduleNameMapper: {
        '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
        '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
        'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
        'assets/(.*)': [
            '<rootDir>/images/$1',
            '<rootDir>/photos/$1',
            '<rootDir>/recipes/$1',
        ],
    },
}

export default config