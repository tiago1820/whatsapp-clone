import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { ChatController } from "../controllers/chat.controller.js";

export const chatRoute = Router();
const auth = new Authenticate();
const chat = new ChatController();
chatRoute.post("/chat/new", auth.authenticate, chat.createChat);