import { DataTypes, Model } from 'sequelize';

import sequelize from '../database';

class AreaGeneric extends Model {
    public id!: number;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public actionServiceName!: string;
    public actionId!: number;
    public actionAccessToken!: string;
    public reactionServiceName!: string;
    public reactionAccessToken!: string;
    public intervalId!: string;
}

AreaGeneric.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        actionServiceName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        actionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        actionAccessToken: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        reactionServiceName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reactionAccessToken: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        intervalId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { sequelize }
);

export { AreaGeneric };
