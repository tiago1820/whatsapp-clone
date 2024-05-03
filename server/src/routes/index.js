import { Router } from "express";
export const router = Router();
import { apiRoute } from "./api.route.js";
import { authRoute } from "./auth.route.js";
import { userRoute } from "./user.route.js";
import { chatRoute } from "./chat.route.js";

router.use(apiRoute);
router.use(authRoute);
router.use(userRoute);
router.use(chatRoute);

