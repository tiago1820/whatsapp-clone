import express from "express";
import morgan from "morgan";
import { router } from "./routes/index.js";

export const server = express();

// Middlewares
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use("/api", router);