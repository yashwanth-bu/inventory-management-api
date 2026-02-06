import prisma from "../../config/prisma.client.js"

/* =========================
   USER-FACING QUERIES
   ========================= */

export function getAllInventories() {
  return prisma.inventory.findMany({
    where: { deletedAt: null },
  });
}

export function getInventoryById(id) {
  return prisma.inventory.findFirst({
    where: { id, deletedAt: null },
  });
}

/* =========================
   MUTATIONS
   ========================= */

export function createInventory(data) {
  return prisma.inventory.create({ data });
}

export function updateInventory(id, data) {
  return prisma.inventory.update({
    where: { id },
    data,
  });
}

/* =========================
   SOFT DELETE & RECOVERY
   ========================= */

export function uniqueInventoryByIdWithDeleteAt(id){
  return prisma.inventory.findUnique({
    where: { id, deletedAt: null }
  });
}

export function deleteInventory(id) {
  return prisma.inventory.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

export function uniqueInventoryById(id){
  return prisma.inventory.findUnique({
    where: { id }
  });
}

export function existingActiveInventory(name){
  return prisma.inventory.findFirst({
    where: { name, deletedAt: null },
  })
}

export async function recoverInventory(id) {
  return prisma.inventory.update({
    where: { id },
    data: { deletedAt: null },
  });
}


/* =========================
   ADMIN / INTERNAL
   ========================= */

export function getAllInventoriesAdmin() {
  return prisma.inventory.findMany();
}

export function getDeletedInventories() {
  return prisma.inventory.findMany({
    where: { deletedAt: { not: null } },
  });
}

export function findFirstInventoryByName(name) {
  return prisma.inventory.findFirst({
    where: { name, deletedAt: null },
  });
}

/* =========================
   CRON / CLEANUP
   ========================= */

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
