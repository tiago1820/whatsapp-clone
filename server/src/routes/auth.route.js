import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRoute = Router();
const auth = new AuthController();

authRoute.post("/auth/signup", auth.registerUser);
authRoute.post("/auth/signin", auth.loginUser);