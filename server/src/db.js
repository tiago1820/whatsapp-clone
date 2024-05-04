import { Sequelize } from "sequelize";
import {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} from "./constants/index.js";
import UserModel from "./models/user.model.js";
import ChatModel from "./models/chat.model.js";
import ChatUserModel from "./models/chatUser.model.js";

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false, native: false }
);

UserModel(sequelize);
ChatModel(sequelize);
ChatUserModel(sequelize);

const { User, Chat, ChatUser } = sequelize.models;

export {
    User,
    Chat,
    ChatUser,
    sequelize as conn
};