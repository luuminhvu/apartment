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
exports.MaintenanceRequest = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Apartment_1 = require("./Apartment");
const User_1 = require("./User");
let MaintenanceRequest = class MaintenanceRequest extends sequelize_typescript_1.Model {
};
exports.MaintenanceRequest = MaintenanceRequest;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MaintenanceRequest.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Apartment_1.Apartment),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MaintenanceRequest.prototype, "apartmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MaintenanceRequest.prototype, "tenantId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], MaintenanceRequest.prototype, "requestDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], MaintenanceRequest.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("submitted", "in_progress", "completed")),
    __metadata("design:type", String)
], MaintenanceRequest.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Apartment_1.Apartment),
    __metadata("design:type", Apartment_1.Apartment)
], MaintenanceRequest.prototype, "apartment", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], MaintenanceRequest.prototype, "tenant", void 0);
exports.MaintenanceRequest = MaintenanceRequest = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "maintenance_requests",
        timestamps: true,
    })
], MaintenanceRequest);
