import { server } from "./app.js";
import { conn } from "./db.js";
import { SERVER_PORT } from "./constants/index.js";

server.listen(SERVER_PORT, async () => {
    await conn.sync({ alter: true });
    console.log(`Listening on port ${SERVER_PORT}`)
});