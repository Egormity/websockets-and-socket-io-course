module.exports = class Orb {
	constructor({ worldWidth, worldHeight }) {
		this.color = this.getRandomColor();
		this.locX = Math.random() * worldWidth;
		this.locY = Math.random() * worldHeight;
		this.radius = 5;
	}

	//
	getRandomColor() {
		const getNum = () => Math.round(50 + Math.random() * 200);
		return `rgb(${getNum()}, ${getNum()}, ${getNum()})`;
	}
};
