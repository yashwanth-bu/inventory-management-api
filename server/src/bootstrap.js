import server from "./server.js";
import { env } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/prisma.client.js"


async function startServer(){
  try {
    await connectDB();
    const httpServer = server.listen(env.port || 5000, env.host || "localhost", function () {
      console.log(`Server running on port ${env.port}`);
    });
    
    async function shutdown(signal) {
      console.log(`\n${signal} received. Shutting down gracefully...`);

      httpServer.close(async function () {
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (error) {
    console.error(error.message);
  }
}

startServer();