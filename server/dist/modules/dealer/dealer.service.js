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
exports.DealerService = void 0;
const fastify_decorators_1 = require("fastify-decorators");
const dealer_entity_1 = require("./dealer.entity");
const DataSourceProvider_1 = require("../../database/DataSourceProvider");
let DealerService = class DealerService {
    constructor(dataSourceProvider) {
        this.dataSourceProvider = dataSourceProvider;
    }
    async init() {
        this.dealerRepository =
            this.dataSourceProvider.dataSource.getRepository(dealer_entity_1.Dealer);
    }
};
__decorate([
    (0, fastify_decorators_1.Initializer)([DataSourceProvider_1.DataSourceProvider]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DealerService.prototype, "init", null);
DealerService = __decorate([
    (0, fastify_decorators_1.Service)(),
    __metadata("design:paramtypes", [DataSourceProvider_1.DataSourceProvider])
], DealerService);
exports.DealerService = DealerService;
//# sourceMappingURL=dealer.service.js.map