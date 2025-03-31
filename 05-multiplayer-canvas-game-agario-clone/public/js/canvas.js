const draw = () => {
	// Clear old frame
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvasEl.width, canvasEl.height);

	// Clam the camera to the player
	const camX = -player.data.locX + canvasEl.width / 2;
	const camY = -player.data.locY + canvasEl.height / 2;
	context.translate(camX, camY);

	// Draw players
	players.forEach(p => {
		context.beginPath();
		context.fillStyle = "rgb(255, 0, 0)";
		context.arc(p.data.locX, p.data.locY, p.data.radius, 0, Math.PI * 2);
		context.fill();
		context.lineWidth = 3;
		context.strokeStyle = "rgb(0, 255, 0)";
		context.stroke();
	});

	// Draw orbs
	orbs.forEach(el => {
		context.beginPath();
		context.fillStyle = el.color;
		context.arc(el.locX, el.locY, el.radius, 0, Math.PI * 2);
		context.fill();
	});

	// Loop animation
	requestAnimationFrame(draw);
};

// Add listener for mouse
canvasEl.addEventListener("mousemove", event => {
	const angleDeg = (Math.atan2(event.clientY - canvasEl.height / 2, event.clientX - canvasEl.width / 2) * 180) / Math.PI;
	if (angleDeg >= 0 && angleDeg < 90) {
		// console.log("Mouse is in the lower right quadrant");
		player.config.xVector = 1 - angleDeg / 90;
		player.config.yVector = -(angleDeg / 90);
	} else if (angleDeg >= 90 && angleDeg <= 180) {
		// console.log("Mouse is in the lower left quadrant");
		player.config.xVector = -(angleDeg - 90) / 90;
		player.config.yVector = -(1 - (angleDeg - 90) / 90);
	} else if (angleDeg >= -180 && angleDeg < -90) {
		// console.log("Mouse is in the top left quadrant");
		player.config.xVector = (angleDeg + 90) / 90;
		player.config.yVector = 1 + (angleDeg + 90) / 90;
	} else if (angleDeg < 0 && angleDeg >= -90) {
		// console.log("Mouse is in the top right quadrant");
		player.config.xVector = (angleDeg + 90) / 90;
		player.config.yVector = 1 - (angleDeg + 90) / 90;
	}
});
