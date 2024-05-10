import { DataTypes, Sequelize } from "sequelize";

export default (sequelize) => {
    sequelize.define('MessageUser', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
        },
        messageId: {
            type: DataTypes.INTEGER,
        },
    }, { timestamps: true });
}