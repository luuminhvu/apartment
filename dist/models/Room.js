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
exports.Room = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Floor_1 = require("./Floor");
let Room = class Room extends sequelize_typescript_1.Model {
    getAvailableSpace() {
        const fraction = this.totalSlots - this.occupiedSlots;
        const fractionString = `${fraction}/${this.totalSlots}`;
        return fractionString;
    }
};
exports.Room = Room;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Room.prototype, "roomNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Room.prototype, "area", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Room.prototype, "roomType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Room.prototype, "amenities", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL),
    __metadata("design:type", Number)
], Room.prototype, "rentPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Room.prototype, "totalSlots", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Room.prototype, "occupiedSlots", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.VIRTUAL),
    __metadata("design:type", String)
], Room.prototype, "availableSpace", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("full", "not-rented", "under repair", "available")),
    __metadata("design:type", String)
], Room.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => User_1.User),
    __metadata("design:type", Array)
], Room.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Floor_1.Floor),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Room.prototype, "floorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Floor_1.Floor),
    __metadata("design:type", Floor_1.Floor)
], Room.prototype, "floor", void 0);
exports.Room = Room = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "rooms",
        timestamps: true,
    })
], Room);
