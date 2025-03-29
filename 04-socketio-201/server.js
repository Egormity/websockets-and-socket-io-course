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
	socket.emit("namespacesList", { data: { namespaces } });
});

// Update room
const updateRoom = (namespace, roomName) => {
	const namespaceIo = io.of(namespace.name).in(roomName);
	const clients = namespaceIo.adapter.rooms.get(roomName);
	namespaceIo.emit("userJoined", { data: { numUsers: clients?.size ?? 0 } });
};

// Listen for every namespace connection
namespaces.forEach(ns =>
	io.of(ns.name).on("connection", nsSocket => {
		// (emit) Namespace load
		console.log(`${nsSocket.id} has joined`);
		nsSocket.emit("namespaceRoomLoad", { data: { namespace: ns } });

		// (on) Join a room
		nsSocket.on("joinRoom", roomName => {
			// 0. Leave old rooms
			const r = nsSocket.rooms.values();
			r?.next();
			const nextRoomName = r?.next()?.value;
			if (nextRoomName) {
				nsSocket.leave(nextRoomName);
				updateRoom(ns, nextRoomName);
			}

			// 1. Joint the room
			nsSocket.join(roomName);

			// 2. (emit) The history
			nsSocket.emit("history", { data: { history: ns.rooms.find(el => el.name === roomName) } });

			// 3. (emit) Send back to number of users
			updateRoom(ns, roomName);
		});

		// (on) User message
		nsSocket.on("newUserMessage", (roomName, msg) => {
			const message = {
				text: msg,
				sendTimestamp: Date.now(),
				username: nsSocket.handshake.query.username,
				avatar: "https://via.placeholder.com/30",
			};
			const nsRoom = ns.rooms.find(el => el.name === roomName);
			nsRoom.addMessage(message);
			io.of(ns.name).in(roomName).emit("newMessageTiClients", {
				data: {
					message,
				},
			});
		});
	})
);
