"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noFavicon = void 0;
const http_status_codes_1 = require("http-status-codes");
async function noFavicon(fastify) {
    fastify.get("/favicon.ico", (_, reply) => {
        reply.code(http_status_codes_1.StatusCodes.NOT_FOUND).send();
    });
}
exports.noFavicon = noFavicon;
//# sourceMappingURL=no-favicon.plugin.js.map