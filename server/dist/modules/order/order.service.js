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
exports.OrderService = void 0;
const fastify_decorators_1 = require("fastify-decorators");
const order_entity_1 = require("./order.entity");
const DataSourceProvider_1 = require("../../database/DataSourceProvider");
let OrderService = class OrderService {
    constructor(dataSourceProvider) {
        this.dataSourceProvider = dataSourceProvider;
    }
    async init() {
        this.orderRepository =
            this.dataSourceProvider.dataSource.getRepository(order_entity_1.Order);
    }
};
__decorate([
    (0, fastify_decorators_1.Initializer)([DataSourceProvider_1.DataSourceProvider]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "init", null);
OrderService = __decorate([
    (0, fastify_decorators_1.Service)(),
    __metadata("design:paramtypes", [DataSourceProvider_1.DataSourceProvider])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map