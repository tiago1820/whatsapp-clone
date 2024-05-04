import { User, Chat, ChatUser, conn } from "../db.js";

export class ChatController {

    createChat = async (req, res) => {
        let data = {};
        try {
            const user1 = await req.user.user;
            const user2 = await this.getUserAndValidate(req.body.userId);
            if (!user2) return res.status(400).json(
                data.error = "Falta el ID del usuario para crear el chat o el usuario no existe.");
            const chat = await ChatUser.findOne({
                attributes: ["chatId"],
                where: { userId: [user1.id, user2.id] },
                group: ["chatId"],
                having: conn.literal("count(*) = 2"),
                raw: true
            });
            if (chat) {
                data = this.setDataProperties(
                    chat.chatId,
                    user2.userName,
                    user2.profileImage,
                    this.createUsersArray(user1, user2)
                );
                return res.status(200).json(data);
            }
            const { dataValues: newChat } = await Chat.create({
                chatName: "",
                isGroupChat: false,
                groupAdminId: null
            });
            await ChatUser.bulkCreate([
                { userId: user1.id, chatId: newChat.id },
                { userId: user2.id, chatId: newChat.id }
            ]);
            data = this.setDataProperties(
                newChat.id,
                user2.userName,
                user2.profileImage,
                this.createUsersArray(user1, user2)
            );
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }

    setDataProperties = (chatId, chatName, profileImage, usersArray) => {
        return { chatId, chatName, profileImage, users: usersArray };
    };

    getUserAndValidate = async (userId) => {
        if (!userId) return null;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            raw: true
        });
        return user;
    }

    createUsersArray = (user1, user2) => {
        const { password, createdAt, updatedAt, ...cleanUser1 } = user1;
        const users = [cleanUser1, user2];
        return users;
    };
}