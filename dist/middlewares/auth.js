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
exports.authMiddleware = void 0;
const verifyToken_1 = require("../utils/verifyToken");
const Response_1 = require("../components/Response");
const auth_1 = require("../common/contants/auth");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return (0, Response_1.UnauthorizedResponse)(res, auth_1.AUTH_CONTANTS.MISSING_TOKEN);
        }
        const decoded = (0, verifyToken_1.verifyToken)(token.split(" ")[1]);
        if (!decoded) {
            return (0, Response_1.UnauthorizedResponse)(res, auth_1.AUTH_CONTANTS.INVALID_TOKEN);
        }
        next();
    }
    catch (error) {
        return (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.authMiddleware = authMiddleware;
