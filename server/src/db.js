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

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false, native: false }
);

UserModel(sequelize);
ChatModel(sequelize);

const { User, Chat } = sequelize.models;

User.belongsToMany(Chat, { through: "ChatUser" });
Chat.belongsToMany(User, { through: "ChatUser" });

export {
    User,
    Chat,
    sequelize as conn
};