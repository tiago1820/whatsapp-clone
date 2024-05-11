import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("Message", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        senderId: {
            type: DataTypes.UUID,
        },
        content: {
            type: DataTypes.STRING,
        },
        chatId: {
            type: DataTypes.UUID,
        },
    }, { timestamps: true });
}