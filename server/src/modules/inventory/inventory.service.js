import prisma from "../../config/prisma.client.js";

// get inventories by user id
export function findByUserId(userId) {
  return prisma.inventory.findMany({
    where: { userId, deletedAt: null }
  });
}

// get inventory by id and user id
export function findById(id, userId) {
  return prisma.inventory.findFirst({
    where: { id, userId, deletedAt: null }
  });
}

// create inventory
export function createInventory(data) {
  return prisma.inventory.create({ data });
}

// update inventory
export function updateInventory(id, userId, data) {
  return prisma.inventory.update({
    where: { id, userId },
    data,
  });
}

// delete inventory
export function deleteInventory(id, userId) {
  return prisma.inventory.update({
    where: { id, userId },
    data: { deletedAt: new Date() },
  });
}

// recover inventory
export function recoverInventory(id, userId) {
  return prisma.inventory.update({
    where: { id, userId },
    data: { deletedAt: null },
  });
}

// find inventory by name and user id
export function findByName(name, userId) {
  return prisma.inventory.findFirst({
    where: { name, userId, deletedAt: null }
  });
}

// find inventory by unique id and user id
export function findByUniqueId(id, userId) {
  return prisma.inventory.findUnique({
    where: { id, userId }
  });
}

// get all inventories for admin
export function getAllInventoriesAdmin() {
  return prisma.inventory.findMany();
}

// find deleted inventories by user user id
export function findDeletedInventories(userId) {
  return prisma.inventory.findMany({
    where: { deletedAt: { not: null }, userId },
  });
}

// permanently delete inventories that were soft deleted more than 30 days ago for a user
export function permanentlyDeleteOldInventories() {
  const THIRTY_DAYS_AGO = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  );

  return prisma.inventory.deleteMany({
    where: {
      deletedAt: {
        lte: THIRTY_DAYS_AGO,
      },
    },
  });
}