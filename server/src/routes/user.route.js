import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { UserController } from "../controllers/user.controller.js";

export const userRoute = Router();
const auth = new Authenticate();
const user = new UserController();
userRoute.get("/user/profile", auth.authenticate, user.findCurrentUser);
userRoute.put("/user/:id", auth.authenticate, user.editUser);