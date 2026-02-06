import { z } from "zod";

export const registerInventorySchema = z.object({
  name: z.string({ required_error: "INVENTORY_NAME_REQUIRED" })
    .min(2, "LEAST_CHAR_ERROR")
});

export const updateInventorySchema = registerInventorySchema.partial();