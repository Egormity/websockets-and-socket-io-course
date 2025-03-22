// 3rd party modules
const express = require("express");
const socketIo = require("socket.io");

// Require namespaces data
const namespaces = require("./data/namespaces");

// Init he app
const app = express();

// Middleware static files
app.use(express.static(`${__dirname}/public`));

// Init the server and io
const expressServer = app.listen(8000);
const io = socketIo(expressServer, { cors: "*" });

// "/" connection
io.on("connection", socket => {
	socket.emit("namespacesList", { data: namespaces });
});

// Listen for every namespace connection
namespaces.forEach(ns => {
	io.of(ns.name).on("connection", nsSocket => {
		console.log(`${nsSocket.id} has joined`);
		nsSocket.emit("namespaceRoomLoad", { data: ns.rooms });
	});
});
