import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define('Chat', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        chatName: {
            type: DataTypes.STRING,
        },
        isGroupChat: {
            type: DataTypes.BOOLEAN,
        },
        groupAdminId: {
            type: DataTypes.UUID, 
        },
    }, { timestamps: true });
}