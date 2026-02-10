import { ZodError } from "zod";

function zodErrors(err) {
  if (!(err instanceof ZodError)) return null;

  const issues = err.issues;

  return {
    statusCode: 400,
    message: "VALIDATION_ERROR",
    data: issues.map(issue => ({
      field: issue.path.join("."),
      message: issue.message,
      meta: issue.params ?? null,
    })),
  };
}

export default zodErrors;
