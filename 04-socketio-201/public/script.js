// Get socket connection
const socket = io("http://localhost:8000");

// Html elements
const namespacesContainer = document.querySelector(".namespaces");
const roomContainer = document.querySelector(".room-list");

// Add the namespaces to html and establish the connections
socket.on("namespacesList", data => {
	namespacesContainer.innerHTML = "";
	data?.data?.forEach(ns => {
		namespacesContainer.innerHTML += `<div class="namespace" onclick="handleNamespaceClick('${ns.name}')"><img src="${ns.image}"/><div>`;
		handleNamespaceConnection(ns);
	});
});

// handle namespace click
const handleNamespaceClick = ns => console.log(ns);
