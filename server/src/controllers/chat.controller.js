import { User, Chat, ChatUser, conn } from "../db.js";

export class ChatController {

    createChat = async (req, res) => {
        let data = {};
        let users = [];
        try {
            const user1 = await req.user.user;
            const user2 = req.body;
            if (!user2) {
                return this.handleError(res, data, 400, "Falta el ID del usuario para crear el chat.");
            }
            const { dataValues: user2Exists } = await User.findByPk(user2.userId, {
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            });
            if (!user2Exists) {
                return this.handleError(res, data, 404, "El usuario con el ID proporcionado no existe.");
            }
            const chat = await ChatUser.findOne({
                attributes: ["chatId"],
                where: {
                    userId: [user1.id, user2Exists.id]
                },
                group: ["chatId"],
                having: conn.literal("count(*) = 2"),
                raw: true
            });

            if (!chat) {
                const { dataValues: chat } = await Chat.create({
                    chatName: "",
                    isGroupChat: false,
                    groupAdminId: null
                });
                await ChatUser.bulkCreate([
                    { userId: user1.id, chatId: chat.id },
                    { userId: user2Exists.id, chatId: chat.id }
                ]);
                users = await this.createUsersArray(user1, user2Exists);
                data.chatId = chat.id;
                data.users = users;
                return res.status(200).json(data);
            } else {
                users = await this.createUsersArray(user1, user2Exists);
                data.chatId = chat.chatId;
                data.users = users;
                return res.status(200).json(data);
            }

        } catch (error) {
            return this.handleError(res, data, 500, "Internal Server Error");
        }
    }

    createUsersArray = async (user1, user2) => {
        const { password, createdAt, updatedAt, ...cleanUser1 } = user1;
        const users = [cleanUser1, user2];
        return users;
    };

    handleError = (res, data, statusCode, message) => {
        data.error = message;
        return res.status(statusCode).json(data);
    }
}