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

router.post('/register', validateZod(UserRegisterSchema), userResigter);

router.post('/login', validateZod(UserLoginSchema), userLogin);

router.delete('/logout', isAuthenticated, userLogout);

export default router;