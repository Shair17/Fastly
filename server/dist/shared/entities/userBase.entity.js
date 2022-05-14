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
exports.UserBase = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const base_entity_1 = require("./base.entity");
const getDefaultAvatar_1 = require("../../utils/getDefaultAvatar");
const defaultAvatar = (0, getDefaultAvatar_1.getDefaultAvatar)(100);
class UserBase extends base_entity_1.Base {
}
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBase.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserBase.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBase.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: defaultAvatar,
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserBase.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserBase.prototype, "birth_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UserBase.prototype, "is_banned", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserBase.prototype, "ban_reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserBase.prototype, "is_active", void 0);
exports.UserBase = UserBase;
//# sourceMappingURL=userBase.entity.js.map