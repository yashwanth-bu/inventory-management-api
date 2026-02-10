import { Router } from "express";

import validateZod from "../../middleware/zod.validation.js";

import { registerInventorySchema, updateInventorySchema } from "./inventory.model.js";

import isAuthenticated from "../../middleware/auth.middleware.js";

import {
  findByUserIdController, findByIdController,
  createInventoryController, updateInventoryController,
  deleteInventoryController, recoverInventoryController,
  findDeletedInventoriesController
} from "./inventory.controller.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", findByUserIdController);
router.get("/deleted", findDeletedInventoriesController);
router.get("/:id", findByIdController);

router.post("/", validateZod(registerInventorySchema), createInventoryController);
router.patch("/:id", validateZod(updateInventorySchema), updateInventoryController);

router.delete("/:id", deleteInventoryController);
router.patch("/:id/recover", recoverInventoryController);

export default router;
