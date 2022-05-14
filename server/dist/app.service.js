"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const fastify_decorators_1 = require("fastify-decorators");
const app_constants_1 = require("./constants/app.constants");
let AppService = class AppService {
    getApp() {
        return {
            appName: "Fastly Delivery ⚡",
            appVersion: app_constants_1.appVersion,
            appDeveloper: "Shair <hello@shair.dev>",
            date: new Date().toISOString(),
        };
    }
};
AppService = __decorate([
    (0, fastify_decorators_1.Service)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map