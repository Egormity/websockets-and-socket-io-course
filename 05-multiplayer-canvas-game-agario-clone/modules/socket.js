const io = require("../server").io;

const Orb = require("../classes/orb");
const PlayerConfig = require("../classes/playerConfig");
const PlayerData = require("../classes/playerData");
const Player = require("../classes/player");

// Settings
const settings = {
	defaultOrbsAmount: 500,
	defaultPlayerSpeed: 5,
	defaultPlayerRadius: 10,
	defaultPlayerZoom: 0.5,
	worldWidth: 500,
	worldHeight: 500,
};

// Generate orbs
const orbs = Array.from({ length: settings.defaultOrbsAmount }, () => new Orb(settings));

// Init players
const players = [];

// Io
io.sockets.on("connect", socket => {
	socket.on("initGame", data => {
		// Make a player
		const playerConfig = new PlayerConfig({ settings });
		const playerData = new PlayerData({ name: data.data.player.name, settings });
		const player = new Player({ socketId: socket.id, data: playerData, config: playerConfig });
		players.push(player);

		// Emit player and orbs
		socket.emit("initGameReturn", { data: { player, orbs } });
	});

	// Update player position
	socket.on("playerUpdate", data => {
		const { player } = data.data;
		for (const p of players) {
			if (p.socketId === player.socketId) {
				p.data.locX += player.config.xVector * p.config.speed;
				p.data.locY += -player.config.yVector * p.config.speed;
				if (p.data.locX <= 0) p.data.locX = 0;
				if (p.data.locX >= settings.worldWidth) p.data.locX = settings.worldWidth;
				if (p.data.locY <= 0) p.data.locY = 0;
				if (p.data.locY >= settings.worldHeight) p.data.locY = settings.worldHeight;
				break;
			}
		}
	});
});

// 30 fps update
setInterval(() => io.of("/game").emit("serverUpdate", { data: { players } }), 1000 / 60);

// Default export
module.exports = io;
