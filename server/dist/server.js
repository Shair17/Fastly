"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fastify_1 = __importDefault(require("fastify"));
const env_1 = __importDefault(require("@fastify/env"));
const path_1 = require("path");
const http_status_codes_1 = require("http-status-codes");
const fastify_decorators_1 = require("fastify-decorators");
const config_schema_1 = require("./config/config.schema");
const app_module_1 = require("./app.module");
async function Server(opts) {
    const server = (0, fastify_1.default)(opts);
    server.register(env_1.default, {
        dotenv: {
            path: (0, path_1.resolve)(__dirname, '../.env'),
        },
        confKey: 'config',
        schema: config_schema_1.configSchema,
    });
    server.register(require('@fastify/rate-limit'), {
        max: 100,
        timeWindow: '1 minute',
    });
    server.setErrorHandler((error, _, reply) => {
        if (reply.statusCode === http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS) {
            error.message = `¡Llegaste al límite de velocidad! ¡Más despacio, por favor!`;
        }
        reply.send(error);
    });
    server.register(Promise.resolve().then(() => __importStar(require('@fastify/compress'))));
    server.register(Promise.resolve().then(() => __importStar(require('@fastify/helmet'))), {
        global: true,
        hidePoweredBy: true,
    });
    server.register(Promise.resolve().then(() => __importStar(require('@fastify/routes'))));
    server.register(Promise.resolve().then(() => __importStar(require('@fastify/static'))), {
        root: (0, path_1.resolve)(__dirname, '../public'),
    });
    server.register(Promise.resolve().then(() => __importStar(require('fastify-favicon'))), {
        path: './public',
    });
    server.register(Promise.resolve().then(() => __importStar(require('fastify-healthcheck'))), {
        exposeUptime: true,
    });
    server.register(fastify_decorators_1.bootstrap, {
        prefix: '/v1',
        controllers: [...app_module_1.AppModule],
    });
    return server;
}
exports.default = Server;
//# sourceMappingURL=server.js.map