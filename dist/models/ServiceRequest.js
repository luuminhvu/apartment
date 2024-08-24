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
exports.ServiceRequest = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const MaintenanceRequest_1 = require("./MaintenanceRequest");
const ServiceProvider_1 = require("./ServiceProvider");
let ServiceRequest = class ServiceRequest extends sequelize_typescript_1.Model {
};
exports.ServiceRequest = ServiceRequest;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => MaintenanceRequest_1.MaintenanceRequest),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "maintenanceRequestId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ServiceProvider_1.ServiceProvider),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "serviceProviderId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ServiceRequest.prototype, "assignedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ServiceRequest.prototype, "completedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("assigned", "in_progress", "completed")),
    __metadata("design:type", String)
], ServiceRequest.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => MaintenanceRequest_1.MaintenanceRequest),
    __metadata("design:type", MaintenanceRequest_1.MaintenanceRequest)
], ServiceRequest.prototype, "maintenanceRequest", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ServiceProvider_1.ServiceProvider),
    __metadata("design:type", ServiceProvider_1.ServiceProvider)
], ServiceRequest.prototype, "serviceProvider", void 0);
exports.ServiceRequest = ServiceRequest = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "service_requests",
        timestamps: true,
    })
], ServiceRequest);
