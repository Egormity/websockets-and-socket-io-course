class Room {
	constructor(id, name, namespaceId, privateRoom = false) {
		this.id = id;
		this.name = name;
		this.namespaceId = namespaceId;
		this.privateRoom = privateRoom;
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
