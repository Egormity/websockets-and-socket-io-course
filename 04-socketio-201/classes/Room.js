class Room {
	constructor(id, name, namespaceId, isPrivateRoom = false) {
		this.id = id;
		this.name = name;
		this.namespaceId = namespaceId;
		this.isPrivateRoom = isPrivateRoom;
		this.history = [];
	}

	//
	addMessage(message) {
		this.history.push(message);
	}

	//
	clearHistory() {
		this.history = [];
	}
}

//
module.exports = Room;
