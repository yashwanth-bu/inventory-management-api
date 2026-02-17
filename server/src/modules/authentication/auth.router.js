import { Router } from 'express';
import {
    userResigter,
    userLogin,
    userLogout
} from './auth.controller.js';

import isAuthenticated from "../../middleware/auth.middleware.js";

import validateZod from "../../middleware/zod.validation.js";

import { UserRegisterSchema, UserLoginSchema } from "./auth.model.js";

const router = Router();

router.get('/me', isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user.id,
      email: req.user.email
    }
  });
});

router.post('/register', validateZod(UserRegisterSchema), userResigter);

router.post('/login', validateZod(UserLoginSchema), userLogin);

router.delete('/logout', isAuthenticated, userLogout);

export default router;