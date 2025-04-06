const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/perfData");
const ModelMachine = require("./models/modelMachine");

//
const checkAndAdd = data =>
	new Promise((resolve, reject) =>
		ModelMachine.findOne({ macA: data.macA }, (err, doc) => {
			console.log(data);
			if (err) throw err;
			if (!doc) new ModelMachine(data).save();
			resolve(true);
		})
	);

//
module.exports = (io, socket) => {
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
	socket.on("c", async data => {
		await checkAndAdd(data.data.performanceData);
	});

	// On update data
	// socket.on("performanceData", data => console.log(data));
};
