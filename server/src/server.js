import express from "express"
import helmet from "helmet";
import morgan from "morgan";

import inventoryRouter from "./modules/inventory/inventory.router.js"
import errorHandler from './middleware/error.handler.js'
import routerError from './middleware/router.error.js'

import "./cron/inventory.cleanup.js";

const server = express()

server.use(express.json())

server.use(helmet());

server.use(morgan("dev"));

server.get("/api/health", function (req, res) {
  res.status(200).json({ status: "OK" });
});

server.use("/api/inventory", inventoryRouter)

server.use(routerError)

server.use(errorHandler)

export default server;