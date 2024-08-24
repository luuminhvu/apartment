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
exports.Building = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Area_1 = require("./Area");
const Floor_1 = require("./Floor");
let Building = class Building extends sequelize_typescript_1.Model {
};
exports.Building = Building;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Building.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Building.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Building.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Area_1.Area),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Building.prototype, "areaId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Area_1.Area),
    __metadata("design:type", Area_1.Area)
], Building.prototype, "area", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Floor_1.Floor),
    __metadata("design:type", Array)
], Building.prototype, "floors", void 0);
exports.Building = Building = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "buildings",
        timestamps: true,
    })
], Building);
