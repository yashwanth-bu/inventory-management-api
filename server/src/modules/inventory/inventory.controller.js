import { registerInventorySchema, updateInventorySchema } from "./inventory.model.js";
import {
  // queries
  getAllInventories, getInventoryById,
  findFirstInventoryByName, getDeletedInventories,

  // mutations
  createInventory, updateInventory,
  deleteInventory, recoverInventory,

  // helpers
  uniqueInventoryById, existingActiveInventory,
  uniqueInventoryByIdWithDeleteAt
} from "./inventory.service.js";
import asyncHandler from "../../middleware/async.handler.js";
import sendResponse from "../../utils/send.response.js";

/* =========================
   ACCESSING INVENTORY DATA
   ========================= */

export const getAllInventoriesController = asyncHandler(async function (req, res) {
  const inventories = await getAllInventories();

  if (inventories.length === 0) {
    return sendResponse(res, 200, { message: "NO_INVENTORY_CREATED" });
  }

  sendResponse(res, 200, { data: inventories });
});

export const getInventoryByIdController = asyncHandler(async function (req, res) {
  const inventory = await getInventoryById(req.params.id);

  if (!inventory) {
    res.status(404);
    throw new Error("INVENTORY_NOT_FOUND");
  }

  sendResponse(res, 200, { data: inventory });
});

/* =========================
   MUTATIONS
   ========================= */

export const createInventoryController = asyncHandler(async function (req, res) {
  const data = registerInventorySchema.parse(req.body);

  await createInventory(data);

  sendResponse(res, 201, { message: "INVENTORY_CREATED" });
});

export const updateInventoryController = asyncHandler(async function (req, res) {
  const data = updateInventorySchema.parse(req.body);

  if (Object.keys(data).length === 0) {
    res.status(400);
    throw new Error("NO_FIELDS_TO_UPDATE");
  }

  await updateInventory(req.params.id, data);

  sendResponse(res, 200, { message: "INVENTORY_UPDATED" });
});

/* =========================
   DELETE & RECOVERY
   ========================= */

export const deleteInventoryController = asyncHandler(async function (req, res) {
  const inventory = await uniqueInventoryByIdWithDeleteAt(req.params.id);

  if (!inventory) {
    res.status(404);
    throw new Error("INVENTORY_NOT_FOUND");
  }

  await deleteInventory(req.params.id);

  sendResponse(res, 200, { message: "INVENTORY_DELETED" });
});

export const recoverInventoryController = asyncHandler(async function (req, res) {
  const inventory = await uniqueInventoryById(req.params.id)

  if (!inventory) {
    res.status(404);
    throw new Error("INVENTORY_NOT_FOUND");
  }

  const existingActive = await existingActiveInventory(inventory.name)

  if (existingActive) {
    res.status(409);
    throw new Error("CANNOT_RECOVER_NAME_ALREADY_EXISTS");
  }

  await recoverInventory(req.params.id);

  sendResponse(res, 200, { message: "INVENTORY_RECOVERED" });
});

export const getDeletedInventoriesController = asyncHandler(async function (req, res) {
  const inventories = await getDeletedInventories();

  if (inventories.length === 0) {
    return sendResponse(res, 200, { message: "NO_INVENTORY_DELETED" });
  }

  sendResponse(res, 200, { data: inventories });
});


/* =========================
   Use query param
   ========================= */

export const getInventoryByNameController = asyncHandler(async (req, res) => {
  const { name } = req.params;

  if (!name) {
    res.status(400);
    throw new Error("INVENTORY_NOT_EXISTS");
  }

  const inventory = await findFirstInventoryByName(name);

  if (!inventory) {
    res.status(404);
    throw new Error("INVENTORY_NOT_EXISTS");
  }

  sendResponse(res, 200, { data: inventory });
});