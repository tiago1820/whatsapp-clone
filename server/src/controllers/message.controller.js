import { Message, MessageUser, User, ChatUser, Chat } from "../db.js";

export class MessageController {

    // funciona pera esta muy feo, pronto sera refactorado
    sendMessage = async (req, res) => {
        let data = {};
        try {
            const { content, chatId } = req.body;
            const user1 = this.cleanUser1(req.user.user);
            if (!content || !chatId) {
                return res.status(400).json(data["error"] = "chatId and message are required.");
            }
            const newMessage = {
                senderId: user1.id,
                content: content,
                chatId: chatId
            };
            let message = (await Message.create(newMessage)).dataValues;
            (await (MessageUser.create({
                userId: message.senderId, messageId: message.id
            }))).dataValues;
            const sender = user1;
            let chat = (await Chat.findByPk(message.chatId, {
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })).dataValues;
            const userIds = (await ChatUser.findAll({
                attributes: ["userId"],
                where: { chatId: chatId },
                raw: true
            }));
            const users = [];
            for (const userId of userIds) {
                const user = await User.findByPk(userId.userId, {
                    attributes: ["id", "userName", "profileImage", "email", "mobile"],
                    raw: true
                });
                if (user) {
                    users.push(user);
                }
            }
            chat.users = users;
            data = {
                id: message.id,
                content: message.content,
                sender,
                chat
            }
            return res.status(201).json(data);
        } catch (error) {
            return res.status(500).json(data["error"] = "Internal Server Error");
        }
    }

    cleanUser1 = (user1) => {
        const { password, createdAt, updatedAt, ...cleanedUser1 } = user1;
        return cleanedUser1;
    }
}