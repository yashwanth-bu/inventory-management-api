import { Prisma } from "@prisma/client";

// Prisma error codes → HTTP status
const knownErrorMap = {
  P2002: 409,
  P2003: 400,
  P2000: 422,
  P2025: 404,
};

// Generic Prisma errors → HTTP status
const genericErrorMap = {
  PrismaClientValidationError: 400,
  PrismaClientUnknownRequestError: 500,
  NotFoundError: 404,
};

function prismaErrors(err) {
  // Known Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      statusCode: knownErrorMap[err.code] || 500,
      errorCode: err.code,
    };
  }

  // Generic Prisma errors
  const genericStatus =
    genericErrorMap[err.constructor?.name] ||
    genericErrorMap[err.name];

  return {
    statusCode: genericStatus || err.statusCode || 500,
  };
}

export default prismaErrors;
