"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFacade = void 0;
const fastify_decorators_1 = require("fastify-decorators");
const DataSourceProvider_1 = require("../../database/DataSourceProvider");
const user_entity_1 = require("./user.entity");
let UserFacade = class UserFacade {
    constructor(dataSourceProvider) {
        this.dataSourceProvider = dataSourceProvider;
    }
    async init() {
        this.repository = this.dataSourceProvider.dataSource.getRepository(user_entity_1.User);
    }
    async getUsers() {
        return this.repository.find();
    }
    async getUserBy(id) {
        return this.repository.findOne({
            where: {
                id,
            },
        });
    }
    async saveUser(user) {
        return this.repository.save(user);
    }
    async deleteBy(id) {
        await this.repository.delete(id);
    }
};
__decorate([
    (0, fastify_decorators_1.Initializer)([DataSourceProvider_1.DataSourceProvider]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserFacade.prototype, "init", null);
UserFacade = __decorate([
    (0, fastify_decorators_1.Service)(),
    __metadata("design:paramtypes", [DataSourceProvider_1.DataSourceProvider])
], UserFacade);
exports.UserFacade = UserFacade;
//# sourceMappingURL=user.facade.js.map