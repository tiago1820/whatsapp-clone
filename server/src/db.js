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
import MessageModel from "./models/message.model.js";
import MessageUserModel from "./models/messageUser.model.js";

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false, native: false }
);

UserModel(sequelize);
ChatModel(sequelize);
ChatUserModel(sequelize);
MessageModel(sequelize);
MessageUserModel(sequelize);

const { User, Chat, ChatUser, Message, MessageUser } = sequelize.models;

export {
    User,
    Chat,
    ChatUser,
    Message,
    MessageUser,
    sequelize as conn
};