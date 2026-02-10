import cron from "node-cron";
import { permanentlyDeleteOldInventories } from "../modules/inventory/inventory.service.js";

cron.schedule("0 2 * * *", async () => {
  try {
    // runs every day at 2 AM
    const deleted = await permanentlyDeleteOldInventories();
    console.log(`Deleted ${deleted.count} old inventories`);
  } catch (err) {
    console.error("Cron error:", err);
  }
});