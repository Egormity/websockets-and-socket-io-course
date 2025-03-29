// Html elements
const namespacesContainer = document.querySelector(".namespaces");
const roomContainer = document.querySelector(".room-list");
const curRoomNumUsersContainer = document.querySelector(".curr-room-num-users");
const curRoomTextContainer = document.querySelector(".curr-room-text");
const messageForm = document.getElementById("message-form");
const inputUserMessage = document.getElementById("user-message");
const messagesContainer = document.getElementById("messages");

// Set username
const username = prompt("What is your name?");

// Get socket connection
const socket = io("http://localhost:8000", { query: { username } });
let nsSocket;

// Add the namespaces to html and establish the connections
socket.on("namespacesList", data => {
	namespacesContainer.innerHTML = "";
	data?.data?.namespaces?.forEach(ns => {
		namespacesContainer.innerHTML += `<div class="namespace" onclick="handleNamespaceClick('${ns.name}')"><img src="${ns.image}"/><div>`;
	});
});

//
const handleClick = (e, roomName) => {
	e.preventDefault();
	const v = inputUserMessage.value;
	if (v && roomName) nsSocket.emit("newUserMessage", roomName, v);
	inputUserMessage.value = "";
};

// handle namespace click
const handleNamespaceClick = namespaceName => {
	// 0. Remove old nss
	if (nsSocket) {
		nsSocket.close();
		messageForm.removeEventListener("submit", handleClick);
	}

	// 1. Connect
	nsSocket = io(`http://localhost:8000/${namespaceName}`);

	// 2. Add rooms
	nsSocket.on("namespaceRoomLoad", data => {
		roomContainer.innerHTML = "";
		data?.data?.namespace?.rooms?.forEach(room => {
			// prettier-ignore
			roomContainer.innerHTML += `<li onclick="handleRoomClick('${room.name}')"><span>${
					room.isPrivate ? "🔒" : "🌐"
				} ${room.name}</span></li>`
		});
	});
};

// Handle room click
const handleRoomClick = roomName => {
	// Helper
	const generateMessage = msg => `
 		<li>
			<div class="user-image">
				<img src="${msg.avatar}" />
			</div>
			<div class="user-message">
				<div class="user-name-time">${msg.username} <span>${new Date(msg.sendTimestamp).toLocaleDateString()} - ${new Date(
		msg.sendTimestamp
	).toLocaleTimeString()}</span></div>
				<div class="message-text">${msg.text}</div>
			</div>
		</li>`;

	// Send room id to the server
	nsSocket.emit("joinRoom", roomName);

	// Get the history
	nsSocket.on("history", data => {
		curRoomTextContainer.innerHTML = roomName;
		messagesContainer.innerHTML = "";
		data?.data?.history?.history?.forEach(msg => (messagesContainer.innerHTML += generateMessage(msg)));
	});

	// Handle joined user
	nsSocket.on("userJoined", data => {
		curRoomNumUsersContainer.innerHTML = `${data?.data?.numUsers} <span class="glyphicon glyphicon-user"><span/>`;
	});

	// Handle user message
	messageForm.addEventListener("submit", e => handleClick(e, roomName));

	// Receive the message
	nsSocket.on("newMessageTiClients", data => {
		messagesContainer.innerHTML += generateMessage(data?.data?.message);
	});
};
