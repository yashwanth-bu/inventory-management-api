import zodErrors from "../utils/zod.errors.js";
import prismaErrors from "../utils/prisma.errors.js";
import sendResponse from "../utils/send.response.js";
import { env } from "../config/env.js";

function errorHandler(err, req, res, next) {
  // Logging
  if (env.nodeEnv === "development") {
    console.error(err.stack);
  } else {
    console.error(err.message);
  }

  // 1️⃣ Zod errors
  const zodError = zodErrors(err);
  if (zodError) {
    return sendResponse(res, zodError.statusCode, {
      message: zodError.message,
      data: zodError.data,
    });
  }

  // 2️⃣ Controller-defined status
  const controllerStatus =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : null;

  // 3️⃣ Prisma errors
  const { statusCode, errorCode } = prismaErrors(err);

  const finalStatus = controllerStatus ?? statusCode ?? 500;

  const finalMessage =
    env.nodeEnv === "development"
      ? err.message
      : finalStatus < 500
      ? "REQUEST_FAILED"
      : "INTERNAL_SERVER_ERROR";

  return sendResponse(res, finalStatus, {
    message: finalMessage,
    errorCode,
  });
}

export default errorHandler;