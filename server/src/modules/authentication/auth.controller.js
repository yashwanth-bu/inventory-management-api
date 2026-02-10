import asyncHandler from "../../middleware/async.handler.js";
import sendResponse from "../../utils/send.response.js";
import { findUserByEmail, createUser } from "./auth.service.js";
import passport from "./passport.config.js";
import bcrypt from "bcrypt";

// User Registration
export const userResigter = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        res.status(409);
        throw new Error("USER_ALREADY_TAKEN");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ email, password: hashedPassword });
    sendResponse(res, 201, { message: "USER_CREATED" });
});

// User Login
export const userLogin = asyncHandler(async (req, res) => {
  const user = await new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return reject(err);
      if (!user) return reject(new Error(info?.message || "INVALID_CREDENTIALS"));
      resolve(user);
    })(req, res);
  });

  await new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) return reject(err);
      resolve();
    });
  });

  sendResponse(res, 200, { message: "LOGIN_SUCCESSFUL" });
});


// User Logout
export const userLogout = asyncHandler(async (req, res, next) => {
  await new Promise((resolve, reject) => {
    req.logout(err => {
      if (err) return reject(err);
      resolve();
    });
  });

  sendResponse(res, 200, { message: "LOGOUT_SUCCESSFUL" });
});
