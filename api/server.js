const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authenticate = require("../auth/authentication-middleware.js");
const authRouter = require("../auth/auth-router.js");
const plantsRouter = require("../plants/plants-router.js");
const usersRouter = require("../users/users-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/plants", authenticate, plantsRouter);
server.use("/api/users", authenticate, usersRouter);

server.get("/", (request, response) => {
  response.send({ api: "Server is working" });
});

module.exports = server;
