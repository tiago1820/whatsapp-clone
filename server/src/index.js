import { app } from "./app.js";
import { conn } from "./db.js";
import { SERVER_PORT } from "./constants/index.js";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";

const server = createServer(app);
server.listen(SERVER_PORT, async () => {
    await conn.sync({ alter: true });
    console.log(`Listening on port ${SERVER_PORT}`)
});
const io = new SocketServer(server);

io.on("connection", (socket) => {

    socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit("message", {
            data
        });
    });
});


