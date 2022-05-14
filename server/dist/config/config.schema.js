"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
exports.configSchema = {
    type: 'object',
    required: [
        'PORT',
        'DATABASE_TYPE',
        'DATABASE_HOST',
        'DATABASE_PORT',
        'DATABASE_USERNAME',
        'DATABASE_PASSWORD',
        'DATABASE_NAME',
    ],
    properties: {
        PORT: {
            type: 'string',
        },
        DATABASE_TYPE: {
            type: 'string',
        },
        DATABASE_HOST: {
            type: 'string',
        },
        DATABASE_PORT: {
            type: 'number',
        },
        DATABASE_USERNAME: {
            type: 'string',
        },
        DATABASE_PASSWORD: {
            type: 'string',
        },
        DATABASE_NAME: {
            type: 'string',
        },
    },
};
//# sourceMappingURL=config.schema.js.map