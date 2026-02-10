import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT,
  host: process.env.HOST,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
  sessionSecret: process.env.SESSION_SECRET
};