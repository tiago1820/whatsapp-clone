import { User, Chat, ChatUser, conn } from "../db.js";

export class ChatController {

    createChat = async (req, res) => {
        let data = {};
        try {
            const user1 = this.cleanUser1(req.user.user);
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

    getAllChats = async (req, res) => {
        let data = {};
        try {
            const user1 = this.cleanUser1(req.user.user);
            const chats = await ChatUser.findAll({
                attributes: ["chatId"],
                where: { userId: user1.id }
            });
            const chatIds = chats.map(chat => chat.chatId);
            let userIds = [];
            for (const chatId of chatIds) {
                const chatUsers = await ChatUser.findAll({
                    attributes: ["userId"],
                    where: { chatId: chatId },
                    raw: true
                });
                userIds = chatUsers.map(chatUser => chatUser.userId);
                userIds = userIds.filter(userId => userId !== user1.id);
                const users = await this.fetchUsers(userIds);
                data = { count: users.length, users }
                return res.status(200).json(data);
            }
        } catch (error) {
            return res.status(500).json(data["error"] = "Internal Server Error");
        }
    }

    createGroup = async (req, res) => {
        let data = {};
        try {
            let { users, chatName } = req.body;
            const user1 = this.cleanUser1(req.user.user);
            if (!users || !chatName) {
                return res.status(400).json(data["error"] = "users y chatName son campos obligatorios");
            }
            users.push(user1.id);
            if (users.length < 2) {
                return res.status(400).json(
                    data["error"] = "Se requieren como mínimo dos usuarios para crear un nuevo grupo.");
            }
            const { dataValues: groupChat } = await Chat.create({
                chatName,
                groupAdminId: user1.id,
                isGroupChat: true,
            });
            const chatId = groupChat.id;
            let userIds = users.map(userId => ({ userId, chatId }));
            await ChatUser.bulkCreate(userIds);
            userIds = userIds.map(obj => obj.userId)
            users = await this.fetchUsers(userIds);
            data = {
                chatId,
                chatName,
                users
            }
            return res.status(200).json(data);
        } catch (error) {
            console.log("Ola", error);
            return res.status(500).json(data["error"] = "Internal Server Error");
        }
    }

    // Metodos Auxiliares
    fetchUsers = async (userIds) => {
        const users = await Promise.all(userIds.map(async userId => {
            const user = await User.findOne({
                attributes: ["id", "userName", "profileImage"],
                where: { id: userId },
                raw: true
            });
            return user;
        }));
        return users;
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
        const users = [user1, user2];
        return users;
    };

    cleanUser1 = (user1) => {
        const { password, createdAt, updatedAt, ...cleanedUser1 } = user1;
        return cleanedUser1;
    }



}