const express = require("express");
const socketIo = require("socket.io");

//
const app = express();

//
app.use(express.static(`${__dirname}/public`));

//
const expressServer = app.listen(8000);
const io = socketIo(expressServer, { cors: "*" });

//
io.on("connection", socket => {
    setInterval(
        () =>
            socket.emit("messageFromServer", {
                message: "Welcome!",
                styles: {
                    position: "absolute",
                    left: `${10 + Math.random() * 10}%`,
                    top: `${10 + Math.random() * 10}%`,
                    transform: "translate(-50%, -50%)",
                },
            }),
        100
    );
    socket.on("messageToServer", data => console.log(data));
});
