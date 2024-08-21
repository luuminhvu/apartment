"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAcceptableResponse = exports.ConflictResponse = exports.NotFoundResponse = exports.ForbiddenResponse = exports.UnauthorizedResponse = exports.BadRequestResponse = exports.ErrorResponse = exports.NoContentResponse = exports.CreatedResponse = exports.SuccessResponse = void 0;
const SuccessResponse = (res, data, message) => {
    return res.status(200).json({
        statusCode: 200,
        message,
        data,
    });
};
exports.SuccessResponse = SuccessResponse;
const CreatedResponse = (res, data, message) => {
    return res.status(201).json({
        statusCode: 201,
        message,
        data,
    });
};
exports.CreatedResponse = CreatedResponse;
const NoContentResponse = (res) => {
    return res.status(204).end();
};
exports.NoContentResponse = NoContentResponse;
const ErrorResponse = (res, error) => {
    return res.status(500).json({
        statusCode: 500,
        error: "Something went wrong",
        details: error,
    });
};
exports.ErrorResponse = ErrorResponse;
const BadRequestResponse = (res, error) => {
    return res.status(400).json({
        statusCode: 400,
        error: "Bad Request",
        details: error,
    });
};
exports.BadRequestResponse = BadRequestResponse;
const UnauthorizedResponse = (res, error) => {
    return res.status(401).json({
        statusCode: 401,
        error: "Unauthorized",
        details: error,
    });
};
exports.UnauthorizedResponse = UnauthorizedResponse;
const ForbiddenResponse = (res, error) => {
    return res.status(403).json({
        statusCode: 403,
        error: "Forbidden",
        details: error,
    });
};
exports.ForbiddenResponse = ForbiddenResponse;
const NotFoundResponse = (res, error) => {
    return res.status(404).json({
        statusCode: 404,
        error: "Not Found",
        details: error,
    });
};
exports.NotFoundResponse = NotFoundResponse;
const ConflictResponse = (res, error) => {
    return res.status(409).json({
        statusCode: 409,
        error: "Conflict",
        details: error,
    });
};
exports.ConflictResponse = ConflictResponse;
const NotAcceptableResponse = (res, error) => {
    return res.status(406).json({
        statusCode: 406,
        error: "Not Acceptable",
        details: error,
    });
};
exports.NotAcceptableResponse = NotAcceptableResponse;
