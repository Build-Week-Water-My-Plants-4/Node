const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const plantsRouter = require("../plants/plants-router.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/plants", authenticate, plantsRouter);

server.get("/", (request, response) => {
  response.send({ api: "Server is working" });
});

module.exports = server;
