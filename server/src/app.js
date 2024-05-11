import express from "express";
import morgan from "morgan";
import { router } from "./routes/index.js";

export const app = express();

// Middlewares
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
