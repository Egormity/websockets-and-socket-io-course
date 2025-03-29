module.exports = class PlayerData {
	constructor({ name, settings }) {
		this.name = name;
		this.locX = Math.round(settings.worldWidth * 0.1 + Math.random() * (settings.worldWidth - settings.worldWidth * 0.1));
		this.locY = Math.round(settings.worldHeight * 0.1 + Math.random() * (settings.worldHeight - settings.worldHeight * 0.1));
		this.radius = settings.defaultPlayerRadius;
		this.color = this.getRandomColor();
	}

	//
	getRandomColor() {
		const getNum = () => Math.round(50 + Math.random() * 200);
		return `rgb(${getNum()}, ${getNum()}, ${getNum()})`;
	}
};
