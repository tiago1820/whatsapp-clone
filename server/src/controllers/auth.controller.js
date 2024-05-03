import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants/index.js";
import { User } from "../db.js";
import { Encryption } from "../utils/encryption.util.js";

export class AuthController {
    constructor() {
        this.encrypt = new Encryption();
    }

    generateToken = (user) => {
        return jwt.sign({ user: user }, JWT_SECRET_KEY);
    }

    authenticateUser = async (email, password) => {
        const { dataValues: user } = await User.findOne({ where: { email } });
        if (!user) return null;
        const isValidPassword = await this.encrypt.validatePassword(password, user.password);
        return isValidPassword ? user : null;
    }

    registerUser = async (req, res) => {
        let data = {};
        try {
            const { userName, email, password } = req.body;
            let existUser = await User.findOne({ where: { email } });
            if (existUser) {
                data = { error: `There is already a user with the email ${email}` };
                return res.status(400).json(data);
            }
            const hash = await this.encrypt.encryptPassword(password);
            const { dataValues: user } = await User.create({ userName, email, password: hash });
            const token = this.generateToken(user);

            data = {
                token,
                userId: user.id,
                userName: user.userName,
                isAuth: true,
                message: "Successfully registered.",
            };
            res.status(201).json(data);
        } catch (error) {
            data = { error: "Internal server error." };
            return res.status(400).json(data);
        }
    }

    loginUser = async (req, res) => {
        let data = {};
        try {
            const { email, password } = req.body;
            const user = await this.authenticateUser(email, password);
            if (!user) {
                data = { error: "Wrong username and/or password!" };
                return res.status(400).json(data);
            }
            const token = this.generateToken(user);
            data = {
                token,
                userId: user.id,
                userName: user.userName,
                isAuth: true,
                message: "Login successful.",
            };
            res.status(200).json(data);
        } catch (error) {
            data["error"] = "Internal Server Error";
            return res.status(500).json(data);
        }
    }
}