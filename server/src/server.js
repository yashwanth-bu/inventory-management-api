import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";

import inventoryRouter from "./modules/inventory/inventory.router.js"
import errorHandler from './middleware/error.handler.js'
import routerError from './middleware/router.error.js'
import corsMiddleware from "./middleware/cors.handler.js";
import authRouter from "./modules/authentication/auth.router.js";
import { env } from "./config/env.js";

import "./cron/inventory.cleanup.js";

const server = express()

server.use(express.json())

server.use(helmet());

server.use(morgan("dev"));

server.use(corsMiddleware);

server.use(session({
  name: 'sessionId',
  secret: env.sessionSecret || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: false }
}));

server.use(passport.initialize());
server.use(passport.session());

server.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

server.use("/api/auth", authRouter)

server.use("/api/inventory", inventoryRouter)

server.use(routerError)

server.use(errorHandler)

export default server;