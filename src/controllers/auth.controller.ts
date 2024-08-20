import { AUTH_CONTANTS } from "./../common/contants/auth";
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import UserInput from "../interfaces/User";
import {
  SuccessResponse,
  ErrorResponse,
  UnauthorizedResponse,
  BadRequestResponse,
} from "../components/Response";
import { verifyRefreshToken } from "../utils/verifyToken";

export const register = async (req: Request, res: Response) => {
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
  const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
    req.body as UserInput;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return ErrorResponse(res, AUTH_CONTANTS.USER_EXISTS);
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
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    SuccessResponse(
      res,
      { accessToken, refreshToken },
      AUTH_CONTANTS.REGISTER_SUCCESS
    );
  } catch (error) {
    ErrorResponse(res, error);
  }
};
export const login = async (req: Request, res: Response) => {
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
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return ErrorResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return ErrorResponse(res, AUTH_CONTANTS.INVALID_PASSWORD);
    }

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    SuccessResponse(
      res,
      { accessToken, refreshToken },
      AUTH_CONTANTS.LOGIN_SUCCESS
    );
  } catch (error) {
    ErrorResponse(res, error);
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
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
    return BadRequestResponse(res, AUTH_CONTANTS.MISSING_TOKEN);
  }

  try {
    const userData = verifyRefreshToken(refreshToken);

    if (!userData) {
      return UnauthorizedResponse(res, AUTH_CONTANTS.INVALID_TOKEN);
    }

    const user = await User.findByPk(userData.id);
    if (!user) {
      return ErrorResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
    }
    const newAccessToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();
    SuccessResponse(
      res,
      { accessToken: newAccessToken, refreshToken: newRefreshToken },
      AUTH_CONTANTS.TOKEN_REFRESH_SUCCESS
    );
  } catch (error) {
    ErrorResponse(res, AUTH_CONTANTS.INVALID_TOKEN);
  }
};
