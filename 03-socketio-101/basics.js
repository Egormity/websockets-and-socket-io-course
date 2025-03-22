const http = require("http");
const socketIo = require("socket.io");

//
const server = http.createServer((req, res) => {
    res.end("Conncted!");
});

//
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

//
io.on("connection", (socket, req) => {
    setInterval(() => {
        socket.emit("welcome", `Welcome, here's your random number: ${Math.random()}`);
    }, 1000 / 12);
    socket.on("message", mes => console.log(mes));
});

//
server.listen(8000);
