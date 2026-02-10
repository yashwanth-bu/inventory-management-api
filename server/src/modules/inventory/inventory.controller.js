import { findByUserId, findById,
    createInventory, updateInventory, deleteInventory, recoverInventory,
    findByName, findByUniqueId, findDeletedInventories
 } from "./inventory.service.js";

import asyncHandler from "../../middleware/async.handler.js";
import sendResponse from "../../utils/send.response.js";


// Get All Inventories by User ID Controller
export const findByUserIdController = asyncHandler(async (req, res) => {
  const inventories = await findByUserId(req.user.id);
  sendResponse(res, 200, { data: inventories });
});


// Get Inventory by ID and User ID Controller
export const findByIdController = asyncHandler(async (req, res) => {
  const inventory = await findById(req.params.id, req.user.id);
  if (!inventory) {
    res.status(404);
    throw new Error("INVENTORY_NOT_FOUND");
  }
  sendResponse(res, 200, { data: inventory });
});



// Create Inventory Controller
export const createInventoryController = asyncHandler(async (req, res) => {
  await createInventory({
    ...req.body,
    userId: req.user.id,
  });
  sendResponse(res, 201, { message: "INVENTORY_CREATED" });
});


// Update Inventory Controller by ID and User ID
export const updateInventoryController = asyncHandler(async (req, res) => {
  const inventory = await findById(req.params.id, req.user.id);
    if (!inventory) {
        res.status(404);
        throw new Error("INVENTORY_NOT_FOUND");
    }
    await updateInventory(req.params.id, req.user.id, req.body);
    sendResponse(res, 200, { message: "INVENTORY_UPDATED" });
});


// Delete Inventory Controller by ID and User ID
export const deleteInventoryController = asyncHandler(async (req, res) => {
  const inventory = await findById(req.params.id, req.user.id);
    if (!inventory) {
        res.status(404);
        throw new Error("INVENTORY_NOT_FOUND");
    }
    await deleteInventory(req.params.id, req.user.id);
    sendResponse(res, 200, { message: "INVENTORY_DELETED" });
});


// Recover Inventory Controller by ID and User ID
export const recoverInventoryController = asyncHandler(async (req, res) => {
  const inventory = await findByUniqueId(req.params.id, req.user.id);
    if (!inventory) {
        res.status(404);
        throw new Error("INVENTORY_NOT_FOUND");
    }
    const Exists = await findByName(inventory.name, req.user.id);
    if (Exists) {
        res.status(409);
        throw new Error("CANNOT_RECOVER_NAME_ALREADY_EXISTS");
    }
    await recoverInventory(req.params.id, req.user.id);
    sendResponse(res, 200, { message: "INVENTORY_RECOVERED" });
});


// Find Deleted Inventories by User ID Controller 
export const findDeletedInventoriesController = asyncHandler(async (req, res) => {
  const inventories = await findDeletedInventories(req.user.id);
  if (inventories.length === 0) {
    return sendResponse(res, 200, { message: "NO_INVENTORY_DELETED" });
  }
  sendResponse(res, 200, { data: inventories });
});