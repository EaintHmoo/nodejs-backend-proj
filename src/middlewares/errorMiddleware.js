import { AppError } from "../utils/appError.js";

export const notFound = (req, res, next) => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.statusCode || res.statusCode;

    if (!statusCode || statusCode < 400) {
        statusCode = 500;
    }

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        statusCode = 401;
    }

    if (err.code === "P2025") {
        statusCode = 404;
    }

    const fallbackMessage = {
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not found",
        500: "Internal server error",
    };

    res.status(statusCode).json({
        status: `${statusCode}`.startsWith("4") ? "fail" : "error",
        message: err.message || fallbackMessage[statusCode] || "Unexpected error",
    });
};
