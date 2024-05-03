import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants/index.js";

export class Authenticate {

    verifyToken = (token) => {
        return new Promise(function (resolve, reject) {
            jwt.verify(token, JWT_SECRET_KEY, function (error, user) {
                if (error) return reject(error);
                resolve(user);
            });
        });
    }

    authenticate = async (req, res, next) => {
        let data = {};
        let user;
        try {
            if (!req.headers?.authorization) {
                data = { error: "Please provide a token." };
                return res.status(400).send(data);
            }
            const bearerToken = req.headers.authorization;
            if (!bearerToken.startsWith("Bearer ")) {
                data = { error: "Please provide a token." };
                return res.status(400).send(data);
            }
            const token = bearerToken.split(" ")[1];
            user = await this.verifyToken(token);
        } catch (error) {
            data = { error: "Internal server error." };
            return res.status(400).json(data);
        }
        req.user = user;
        next();
    }
}