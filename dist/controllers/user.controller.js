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
exports.editUser = exports.getUser = exports.addUser = exports.deleteUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Response_1 = require("../components/Response");
const user_1 = require("../common/contants/user");
const auth_1 = require("../common/contants/auth");
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @swagger
     * /user/delete:
     *   delete:
     *     summary: Deletes a user by their email address.
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: The email address of the user to be deleted.
     *             required:
     *               - email
     *     responses:
     *       200:
     *         description: Successfully deleted the user.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal server error.
     */
    const { email } = req.body;
    try {
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            return (0, Response_1.NotFoundResponse)(res, auth_1.AUTH_CONTANTS.USER_NOT_EXISTS);
        }
        yield user.destroy();
        (0, Response_1.SuccessResponse)(res, {}, user_1.USER_CONTANTS.USER_DELETED);
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.deleteUser = deleteUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @swagger
     * /user/add:
     *   post:
     *     summary: Adds a new user to the system.
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: The email address of the new USER_CONTANTS.
     *               password:
     *                 type: string
     *                 description: The password for the new USER_CONTANTS.
     *               firstName:
     *                 type: string
     *                 description: The first name of the new USER_CONTANTS.
     *               lastName:
     *                 type: string
     *                 description: The last name of the new USER_CONTANTS.
     *               dateOfBirth:
     *                 type: string
     *                 format: date
     *                 description: The date of birth of the new user (optional).
     *               phoneNumber:
     *                 type: string
     *                 description: The phone number of the new user (optional).
     *             required:
     *               - email
     *               - password
     *     responses:
     *       201:
     *         description: Successfully created the USER_CONTANTS.
     *       409:
     *         description: Conflict, user already exists.
     *       500:
     *         description: Internal server error.
     */
    const { email, password, firstName, lastName, dateOfBirth, phoneNumber } = req.body;
    try {
        const existingUser = yield User_1.User.findOne({ where: { email } });
        if (existingUser) {
            return (0, Response_1.ConflictResponse)(res, auth_1.AUTH_CONTANTS.USER_EXISTS);
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
        (0, Response_1.CreatedResponse)(res, user, auth_1.AUTH_CONTANTS.REGISTER_SUCCESS);
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.addUser = addUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @swagger
     * /user/get:
     *   get:
     *     summary: Retrieves USER with pagination.
     *     tags: [User]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 1
     *         description: The page number to retrieve.
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: The number of USER to retrieve per page.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully retrieved the USER_CONTANTS.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 USER:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       email:
     *                         type: string
     *                       firstName:
     *                         type: string
     *                       lastName:
     *                         type: string
     *                       dateOfBirth:
     *                         type: string
     *                         format: date
     *                       phoneNumber:
     *                         type: string
     *                 current_page:
     *                   type: integer
     *                   description: The current page number.
     *                 total_page:
     *                   type: integer
     *                   description: The total number of pages.
     *                 page_size:
     *                   type: integer
     *                   description: The number of USER per page.
     *                 total:
     *                   type: integer
     *                   description: The total number of USER_CONTANTS.
     *       404:
     *         description: No USER found.
     *       500:
     *         description: Internal server error.
     */
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) ||
        isNaN(limitNumber) ||
        pageNumber < 1 ||
        limitNumber < 1) {
        return (0, Response_1.ErrorResponse)(res, "Invalid pagination parameters.");
    }
    try {
        const { count, rows: users } = yield User_1.User.findAndCountAll({
            offset: (pageNumber - 1) * limitNumber,
            limit: limitNumber,
        });
        if (users.length === 0) {
            return (0, Response_1.NotFoundResponse)(res, auth_1.AUTH_CONTANTS.USER_NOT_EXISTS);
        }
        const totalPages = Math.ceil(count / limitNumber);
        (0, Response_1.SuccessResponse)(res, {
            users: users,
            current_page: pageNumber,
            total_page: totalPages,
            page_size: limitNumber,
            total: count,
        }, user_1.USER_CONTANTS.USER_FOUND);
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.getUser = getUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @swagger
     * /user/update:
     *   put:
     *     summary: Edits an existing user's details.
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: The email address of the user to be edited.
     *               password:
     *                 type: string
     *                 description: The new password for the user (optional).
     *               firstName:
     *                 type: string
     *                 description: The new first name of the user (optional).
     *               lastName:
     *                 type: string
     *                 description: The new last name of the user (optional).
     *               dateOfBirth:
     *                 type: string
     *                 format: date
     *                 description: The new date of birth of the user (optional).
     *               phoneNumber:
     *                 type: string
     *                 description: The new phone number of the user (optional).
     *             required:
     *               - email
     *     responses:
     *       200:
     *         description: Successfully updated the user details.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal server error.
     */
    const { email, password, firstName, lastName, dateOfBirth, phoneNumber } = req.body;
    try {
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            return (0, Response_1.NotFoundResponse)(res, auth_1.AUTH_CONTANTS.USER_NOT_EXISTS);
        }
        if (password) {
            user.password = yield bcrypt_1.default.hash(password, 10);
        }
        if (firstName !== undefined) {
            user.firstName = firstName;
        }
        if (lastName !== undefined) {
            user.lastName = lastName;
        }
        if (dateOfBirth !== undefined) {
            user.dateOfBirth = dateOfBirth;
        }
        if (phoneNumber !== undefined) {
            user.phoneNumber = phoneNumber;
        }
        yield user.save();
        (0, Response_1.SuccessResponse)(res, user, user_1.USER_CONTANTS.UPDATE_SUCCESS);
    }
    catch (error) {
        (0, Response_1.ErrorResponse)(res, error);
    }
});
exports.editUser = editUser;
