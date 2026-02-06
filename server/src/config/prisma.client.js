import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connectDB(retries = 5, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
          await prisma.$connect();
          console.log("Database connected successfully!");
          return;
        } catch (err) {
          console.error(`DB connection failed. Retry ${i + 1}/${retries} in ${delay / 1000}s`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    console.error("Database connection failed after multiple attempts. Exiting.");
    process.exit(1);
}

export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully!");
  } catch (error) {
    console.error("Error during DB disconnect", error);
  }
};

export default prisma;