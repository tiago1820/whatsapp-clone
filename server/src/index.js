import { app } from "./app.js";
import { conn } from "./db.js";
import { SERVER_PORT } from "./constants/index.js";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";

const server = createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("message", (body) => {
        console.log("body:", body);

        socket.broadcast.emit("message", {
            body,
            from: socket.id.slice(6),
        });
    });
});


io.listen(SERVER_PORT, async () => {
    await conn.sync({ alter: true });
    console.log(`Listening on port ${SERVER_PORT}`)
});