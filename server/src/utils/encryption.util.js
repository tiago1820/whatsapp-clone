import bcrypt from "bcryptjs";

export class Encryption {

    encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    validatePassword = (reqPassword, dbPassword) => {
        return bcrypt.compare(reqPassword, dbPassword);
    }
}