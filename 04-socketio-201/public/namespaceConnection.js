// Html elements
const roomContainer = document.querySelector(".room-list");

// Handle single namespace connection
const handleNamespaceConnection = ns => {
	// 1.
	const namespaceSocket = io(`http://localhost:8000/${ns.name}`);
	namespaceSocket.on("namespaceRoomLoad", rooms => "TODO:");

	// 2.
	roomContainer.innerHTML = "";
	ns.rooms.forEach(
		room =>
			(roomContainer.innerHTML += `<li onclick="handleRoomClick('${room.name}')"><span>${room.isPrivate ? "🔒" : "🌐"} ${
				room.name
			}</span></li>`)
	);
};

// Handle room click
const handleRoomClick = room => {
	console.log(room);
};
