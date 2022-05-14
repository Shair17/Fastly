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
exports.DataSourceProvider = void 0;
const fastify_decorators_1 = require("fastify-decorators");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../modules/admin/admin.entity");
const customer_entity_1 = require("../modules/customer/customer.entity");
const dealer_entity_1 = require("../modules/dealer/dealer.entity");
const user_entity_1 = require("../modules/user/user.entity");
const order_entity_1 = require("../modules/order/order.entity");
const product_entity_1 = require("../modules/product/product.entity");
const store_entity_1 = require("../modules/store/store.entity");
let DataSourceProvider = class DataSourceProvider {
    constructor() {
        this.fastify = (0, fastify_decorators_1.getInstanceByToken)(fastify_decorators_1.FastifyInstanceToken);
    }
    get dataSource() {
        const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, } = this.fastify.config;
        return new typeorm_1.DataSource({
            type: 'mysql',
            host: DATABASE_HOST,
            port: +DATABASE_PORT,
            username: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
            entities: [admin_entity_1.Admin, customer_entity_1.Customer, dealer_entity_1.Dealer, user_entity_1.User, order_entity_1.Order, product_entity_1.Product, store_entity_1.Store],
            synchronize: true,
        });
    }
    async init() {
        let startTime = performance.now();
        await this.dataSource.initialize();
        let endTime = performance.now();
        this.fastify.log.info(`TypeORM Module has established the connection to the database and it took ${Math.floor(endTime - startTime)} ms`);
    }
    async destroy() {
        await this.dataSource.destroy();
    }
};
__decorate([
    (0, fastify_decorators_1.Initializer)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataSourceProvider.prototype, "init", null);
__decorate([
    (0, fastify_decorators_1.Destructor)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataSourceProvider.prototype, "destroy", null);
DataSourceProvider = __decorate([
    (0, fastify_decorators_1.Service)()
], DataSourceProvider);
exports.DataSourceProvider = DataSourceProvider;
//# sourceMappingURL=DataSourceProvider.js.map