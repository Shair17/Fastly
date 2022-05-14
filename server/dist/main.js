"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const app_constants_1 = require("./constants/app.constants");
async function main() {
    const startTime = performance.now();
    const app = await (0, server_1.default)({
        logger: true,
        disableRequestLogging: true,
        ignoreTrailingSlash: true,
    });
    app.log.info(`Starting Fastly server application at ${new Date().toString()}`);
    const endTime = performance.now();
    if (!!(require.main && module.children)) {
        for (let [path, route] of app.routes) {
            app.log.info(`Mapped {${path}, ${route[0].method}} route`);
        }
        app.ready(async () => {
            app.log.info(`Fastly server took ${Math.floor(endTime - startTime)} ms to start`);
            app.log.info(`Developed by @Shair17 <hello@shair.dev>, https://shair.dev`);
            await app.listen(+app.config.PORT, app_constants_1.appHost);
        });
    }
}
main();
//# sourceMappingURL=main.js.map