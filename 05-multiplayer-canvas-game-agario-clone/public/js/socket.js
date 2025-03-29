//connect to the socket server!
const socket = io.connect("http://localhost:8000");
const socketGame = io.connect("http://localhost:8000/game");

// Init the game
const initGame = ({ player }) => {
	socket.emit("initGame", { data: { player: { name: player.name } } });

	// Start drawing
	draw();
};

// Init data from the server
socket.on("initGameReturn", data => {
	orbs = data.data.orbs;
	player = data.data.player;

	// Send update to the server
	setInterval(() => socket.emit("playerUpdate", { data: { player } }), 1000 / 60);

	// Receiver server update
	socketGame.on("serverUpdate", data => {
		const { players: playersFromServer } = data.data;
		players = playersFromServer;
		player = playersFromServer.find(p => p.socketId === player.socketId);
	});
});

// const init = async () => {
// 	//init is called inside of start-game click listener
// 	const initData = await socket.emitWithAck("init", {
// 		playerName: player.name,
// 	});
// 	//our await has resolved, so start 'tocking'
// 	setInterval(async () => {
// 		socket.emit("tock", {
// 			xVector: player.xVector ? player.xVector : 0.1,
// 			yVector: player.yVector ? player.yVector : 0.1,
// 		});
// 	}, 33);
// 	// console.log(initData.orbs);
// 	orbs = initData.orbs;
// 	player.indexInPlayers = initData.indexInPlayers;
// 	draw(); //draw function is in canvasStuff
// };

// //the server sends out the location/data of all players 30/second
// socket.on("tick", playersArray => {
// 	// console.log(players)
// 	players = playersArray;
// 	if (players[player.indexInPlayers].playerData) {
// 		player.locX = players[player.indexInPlayers].playerData.locX;
// 		player.locY = players[player.indexInPlayers].playerData.locY;
// 	}
// });

// socket.on("orbSwitch", orbData => {
// 	//the server just told us that an orb was absorbed. Replace it in the orbs array!
// 	orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
// });

// socket.on("playerAbsorbed", absorbData => {
// 	document.querySelector("#game-message").innerHTML = `${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy}`;
// 	document.querySelector("#game-message").style.opacity = 1;
// 	window.setTimeout(() => {
// 		document.querySelector("#game-message").style.opacity = 0;
// 	}, 2000);
// });

// socket.on("updateLeaderBoard", leaderBoardArray => {
// 	// console.log(leaderBoardArray)
// 	leaderBoardArray.sort((a, b) => {
// 		return b.score - a.score;
// 	});
// 	document.querySelector(".leader-board").innerHTML = "";
// 	leaderBoardArray.forEach(p => {
// 		if (!p.name) {
// 			return;
// 		}
// 		document.querySelector(".leader-board").innerHTML += `
//                 <li class="leaderboard-player">${p.name} - ${p.score}</li>
//             `;
// 	});
// 	const el = leaderBoardArray.find(u => u.name === player.name);
// 	document.querySelector(".player-score").innerHTML = el.score;
// });
