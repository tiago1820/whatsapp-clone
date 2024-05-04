import { DataTypes, UUID } from "sequelize";

export default (sequelize) => {
    sequelize.define('ChatUser', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
        },
        chatId: {
            type: DataTypes.UUID,
        },
    }, { timestamps: false });
}