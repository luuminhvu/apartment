"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAreas = void 0;
const Response_1 = require("../components/Response");
const Area_1 = require("../models/Area");
const Building_1 = require("../models/Building");
const Floor_1 = require("../models/Floor");
const Room_1 = require("../models/Room");
const getAllAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const areas = yield Area_1.Area.findAndCountAll({
            attributes: ["id", "name"],
            include: [
                {
                    model: Building_1.Building,
                    attributes: ["name"],
                    include: [
                        {
                            model: Floor_1.Floor,
                            attributes: ["floorNumber"],
                            include: [
                                {
                                    model: Room_1.Room,
                                    attributes: [
                                        "roomNumber",
                                        "roomType",
                                        "status",
                                        "rentPrice",
                                        "amenities",
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });
        const totalPages = Math.ceil(areas.count / pageSize);
        (0, Response_1.SuccessResponse)(res, {
            data: areas.rows,
            pagination: {
                currentPage: page,
                pageSize: pageSize,
                totalItems: areas.count,
                totalPages: totalPages,
            },
        }, "Areas fetched successfully");
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.getAllAreas = getAllAreas;
