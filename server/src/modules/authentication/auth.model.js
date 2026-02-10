import { z } from "zod";

export const UserRegisterSchema = z.object({
  email: z
    .string({ required_error: "EMAIL_REQUIRED" })
    .min(1, "EMAIL_REQUIRED")
    .email("EMAIL_INVALID"),

  password: z
    .string({ required_error: "PASSWORD_REQUIRED" })
    .min(8, "PASSWORD_MIN_LENGTH")
    .regex(/[a-z]/, "PASSWORD_LOWERCASE_REQUIRED")
    .regex(/[A-Z]/, "PASSWORD_UPPERCASE_REQUIRED")
    .regex(/[0-9]/, "PASSWORD_NUMBER_REQUIRED")
    .regex(/[^A-Za-z0-9]/, "PASSWORD_SPECIAL_CHAR_REQUIRED"),
});

export const UserLoginSchema = z.object({
  email: z
    .string({ required_error: "CREDENTIALS_REQUIRED" })
    .min(1, "CREDENTIALS_REQUIRED"),
  password: z.string({ required_error: "CREDENTIALS_REQUIRED"})
    .min(1, "CREDENTIALS_REQUIRED"),
});