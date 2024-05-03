import { User, Chat, conn } from "../db.js";

export class ChatController {
    createChat = async (req, res) => {
        let data = {}
        try {
            const reqUser = req.user.user.id;
            const userId = req.body.userId;
            if (!userId) {
                data['error'] = 'Falta el ID del usuario para crear el chat.';
                return res.status(400).json(data);
            }

            // continua



            return { reqUser, userId }
        } catch (error) {
            data['error'] = 'Internal Server Error';
            return res.status(500).json(data);
        }
    }

}