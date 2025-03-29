const express = require("express");
const socketIo = require("socket.io");
const helmet = require("helmet");

// Init express app
const app = express();

// Middleware client files
app.use(express.static(`${__dirname}/public`));

// Middleware security
app.use(helmet());

// Init socket.io
const expressServer = app.listen(8000);
const io = socketIo(expressServer, { cors: "*" });

// Export
module.exports.app = app;
module.exports.io = io;
