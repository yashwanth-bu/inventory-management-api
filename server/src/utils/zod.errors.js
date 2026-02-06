import { ZodError } from "zod";

function zodErrors(err) {
  if (!(err instanceof ZodError)) return null;

  const missingFields = err.errors.filter(
    e => e.code === "invalid_type" && e.received === "undefined"
  );

  // Multiple required fields missing
  if (missingFields.length >= 2) {
    return {
      statusCode: 400,
      message: "ALL_FIELDS_MANDATORY",
    };
  }

  // Per-field errors
  return {
    statusCode: 400,
    message: "VALIDATION_ERROR",
    data: err.errors.map(e => ({
      field: e.path.join("."),
      message: e.message, // errorCode
      meta: e.params ?? null,
    })),
  };
}

export default zodErrors;
