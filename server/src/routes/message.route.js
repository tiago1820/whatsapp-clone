import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { MessageController } from "../controllers/message.controller.js";

export const messageRoute = Router();
const auth = new Authenticate();
const message = new MessageController();
messageRoute.post("/message/new", auth.authenticate, message.sendMessage);
// messageRoute.get("/chat/all", auth.authenticate, chat.getAllChats);