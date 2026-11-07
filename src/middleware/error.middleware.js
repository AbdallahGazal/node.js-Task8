import { NODE_ENV } from "../config.js";

export const globalErrorHandling = (err, req, res, next) => {
  if (err.message == "Email already exists.") err.cause = { status: 409 };
  if (err.message.includes("Note validation failed:"))
    err.cause = { status: 409 };
  res.status(err.cause?.status ?? 500).json({
    error_message: err.message || "Server Error",
    err: NODE_ENV == "development" ? err : undefined,
    stack: NODE_ENV == "development" ? err.stack : undefined,
  });
};
