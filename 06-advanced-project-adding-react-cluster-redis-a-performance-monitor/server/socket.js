const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/perfData");
const ModelMachine = require("./models/modelMachine");

module.exports = (io, socket) => {
	let macA;
	checkAndAdd = () => {};
	//
	socket.on("clientAuth", data => {
		// Valid nodeClient
		if (data.data.key === "wa3rfkp0-e4j-wQA@W#E") {
			socket.join("clients");
		}
		// Valid uiClient
		else if (key === "aws89o0efhij") {
			// TODO:
		}
		// Invalid client
		else {
			socket.disconnect(true);
		}
	});

	// A machine has connected
	socket.on("initPerformanceData", data => {
		macA = data.data.macA;
		checkAndAdd(macA);
	});

	// On update data
	// socket.on("performanceData", data => console.log(data));
};
