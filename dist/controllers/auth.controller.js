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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.login = exports.register = void 0;
const auth_1 = require("./../common/contants/auth");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Response_1 = require("../components/Response");
const verifyToken_1 = require("../utils/verifyToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               firstName:
     *                 type: string
     *               lastName:
     *                 type: string
     *               dateOfBirth:
     *                 type: string
     *               phoneNumber:
     *                 type: string
     *     responses:
     *       200:
     *         description: User registered successfully
     *       400:
     *         description: Bad request
     */
    const { email, password, firstName, lastName, dateOfBirth, phoneNumber } = req.body;
    try {
        const existingUser = yield User_1.User.findOne({ where: { email } });
        if (existingUser) {
            return (0, Response_1.ErrorResponse)(res, auth_1.AUTH_CONTANTS.USER_EXISTS);
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            dateOfBirth: dateOfBirth !== null && dateOfBirth !== void 0 ? dateOfBirth : null,
            phoneNumber: phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : null,
        });
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        (0, Response_1.SuccessResponse)(res, { accessToken, refreshToken }, auth_1.AUTH_CONTANTS.REGISTER_SUCCESS);
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     *
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login a user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: User logged in successfully
     *       500:
     *         description: Internal server error
     */
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            return (0, Response_1.ErrorResponse)(res, auth_1.AUTH_CONTANTS.USER_NOT_EXISTS);
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return (0, Response_1.ErrorResponse)(res, auth_1.AUTH_CONTANTS.INVALID_PASSWORD);
        }
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        (0, Response_1.SuccessResponse)(res, { accessToken, refreshToken }, auth_1.AUTH_CONTANTS.LOGIN_SUCCESS);
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.login = login;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @swagger
     * /auth/refresh-token:
     *   post:
     *     summary: Refreshes the access token using a valid refresh token.
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               refreshToken:
     *                 type: string
     *                 description: The refresh token to be used for generating a new access token.
     *             required:
     *               - refreshToken
     *     responses:
     *       200:
     *         description: Successfully refreshed access token.
     *       400:
     *         description: Bad request, missing or invalid token.
     *       401:
     *         description: Unauthorized, invalid or expired refresh token.
     */
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return (0, Response_1.BadRequestResponse)(res, auth_1.AUTH_CONTANTS.MISSING_TOKEN);
    }
    try {
        const userData = (0, verifyToken_1.verifyRefreshToken)(refreshToken);
        if (!userData) {
            return (0, Response_1.UnauthorizedResponse)(res, auth_1.AUTH_CONTANTS.INVALID_TOKEN);
        }
        const user = yield User_1.User.findByPk(userData.id);
        if (!user) {
            return (0, Response_1.ErrorResponse)(res, auth_1.AUTH_CONTANTS.USER_NOT_EXISTS);
        }
        const newAccessToken = user.generateAuthToken();
        const newRefreshToken = user.generateRefreshToken();
        (0, Response_1.SuccessResponse)(res, { accessToken: newAccessToken, refreshToken: newRefreshToken }, auth_1.AUTH_CONTANTS.TOKEN_REFRESH_SUCCESS);
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, auth_1.AUTH_CONTANTS.INVALID_TOKEN);
    }
});
exports.refreshAccessToken = refreshAccessToken;
