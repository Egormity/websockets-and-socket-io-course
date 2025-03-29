module.exports = class Player {
	constructor({ socketId, data, config }) {
		this.socketId = socketId;
		this.data = data;
		this.config = config;
	}
};
