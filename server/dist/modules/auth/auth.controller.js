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
exports.AuthController = void 0;
const fastify_decorators_1 = require("fastify-decorators");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async logInWithFacebook() {
        return 'facebook';
    }
    async refreshFacebookTokens() {
        return 'facebook refresh';
    }
    async loginAdmin() {
        return 'admin login';
    }
    async registerAdmin() {
        return 'admin register';
    }
    async refreshAdminTokens() {
        return 'admin refresh';
    }
    async loginCustomer() {
        return 'customer login';
    }
    async registerCustomer() {
        return 'customer register';
    }
    async refreshCustomerTokens() {
        return 'customer refresh';
    }
    async loginDealer() {
        return 'dealer login';
    }
    async registerDealer() {
        return 'dealer register';
    }
    async refreshDealerTokens() {
        return 'dealer refresh';
    }
};
__decorate([
    (0, fastify_decorators_1.POST)('/facebook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logInWithFacebook", null);
__decorate([
    (0, fastify_decorators_1.POST)('/facebook/refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshFacebookTokens", null);
__decorate([
    (0, fastify_decorators_1.POST)('/admin/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, fastify_decorators_1.POST)('/admin/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, fastify_decorators_1.POST)('/admin/refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAdminTokens", null);
__decorate([
    (0, fastify_decorators_1.POST)('/customer/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginCustomer", null);
__decorate([
    (0, fastify_decorators_1.POST)('/customer/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerCustomer", null);
__decorate([
    (0, fastify_decorators_1.POST)('/customer/refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshCustomerTokens", null);
__decorate([
    (0, fastify_decorators_1.POST)('/dealer/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginDealer", null);
__decorate([
    (0, fastify_decorators_1.POST)('/dealer/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerDealer", null);
__decorate([
    (0, fastify_decorators_1.POST)('/dealer/refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshDealerTokens", null);
AuthController = __decorate([
    (0, fastify_decorators_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map