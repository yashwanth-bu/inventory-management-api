import { Router } from "express";

import {
  getAllInventoriesController, getInventoryByIdController,
  createInventoryController, updateInventoryController,
  deleteInventoryController, recoverInventoryController,
  getDeletedInventoriesController, getInventoryByNameController
} from "./inventory.controller.js";

const router = Router();

router.get("/", getAllInventoriesController);
router.get("/deleted", getDeletedInventoriesController);
router.get("/:id", getInventoryByIdController);

router.get("/by-name/:name", getInventoryByNameController)

router.post("/", createInventoryController);
router.patch("/:id", updateInventoryController);
router.delete("/:id", deleteInventoryController);
router.patch("/:id/recover", recoverInventoryController);

export default router;
