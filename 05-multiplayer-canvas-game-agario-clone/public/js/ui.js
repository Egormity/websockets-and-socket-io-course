const canvasEl = document.querySelector("#the-canvas");
const loginModalEl = new bootstrap.Modal(document.querySelector("#loginModal"));
const spawnModalEl = new bootstrap.Modal(document.querySelector("#spawnModal"));

const nameFormEl = document.querySelector(".name-form");
const playerNameEl = document.querySelector(".player-name");
const nameInputEl = document.querySelector("#name-input");

const startGameEl = document.querySelector(".start-game");
const hiddenOnStartEls = document.querySelectorAll(".hiddenOnStart");

// Set up the canvas
const context = canvasEl.getContext("2d");
canvasEl.height = window.innerHeight;
canvasEl.width = window.innerWidth;

// On page load, open the login modal
window.addEventListener("load", () => loginModalEl.show());

// Handle name form
nameFormEl.addEventListener("submit", e => {
	e.preventDefault();
	player.name = nameInputEl.value;
	playerNameEl.innerHTML = player.name;
	loginModalEl.hide();
	spawnModalEl.show();
});

// Handle start game
startGameEl.addEventListener("click", e => {
	//hHide the start modal
	spawnModalEl.hide();

	// Show the hiddenOnStart elements
	[...hiddenOnStartEls].forEach(el => el.removeAttribute("hidden"));

	// Init io inside of socket.js
	initGame({ player });
});
