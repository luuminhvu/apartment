import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import UserInput from "../interfaces/User";
import {
  SuccessResponse,
  ErrorResponse,
  CreatedResponse,
  NotFoundResponse,
  ConflictResponse,
} from "../components/Response";
import { USER_CONTANTS } from "../common/contants/user";
import { AUTH_CONTANTS } from "../common/contants/auth";
export const deleteUser = async (req: Request, res: Response) => {
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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NotFoundResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
    }
    await user.destroy();
    SuccessResponse(res, {}, USER_CONTANTS.USER_DELETED);
  } catch (error) {
    ErrorResponse(res, error);
  }
};
export const addUser = async (req: Request, res: Response) => {
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
  const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
    req.body as UserInput;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return ConflictResponse(res, AUTH_CONTANTS.USER_EXISTS);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth: dateOfBirth ?? null,
      phoneNumber: phoneNumber ?? null,
    } as any);
    CreatedResponse(res, user, AUTH_CONTANTS.REGISTER_SUCCESS);
  } catch (error) {
    ErrorResponse(res, error);
  }
};

export const getUser = async (req: Request, res: Response) => {
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
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    return ErrorResponse(res, "Invalid pagination parameters.");
  }

  try {
    const { count, rows: users } = await User.findAndCountAll({
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber,
    });

    if (users.length === 0) {
      return NotFoundResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
    }

    const totalPages = Math.ceil(count / limitNumber);

    SuccessResponse(
      res,
      {
        users: users,
        current_page: pageNumber,
        total_page: totalPages,
        page_size: limitNumber,
        total: count,
      },
      USER_CONTANTS.USER_FOUND
    );
  } catch (error) {
    ErrorResponse(res, error);
  }
};

export const editUser = async (req: Request, res: Response) => {
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
  const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
    req.body as UserInput;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NotFoundResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
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
    await user.save();
    SuccessResponse(res, user, USER_CONTANTS.UPDATE_SUCCESS);
  } catch (error) {
    ErrorResponse(res, error);
  }
};
