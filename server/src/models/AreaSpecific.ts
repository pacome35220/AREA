import { DataTypes, Model } from 'sequelize';

import sequelize from '../database';

class AreaSpecific extends Model {
    public id!: number;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public serviceName!: string;
    public areaId!: number;
    public actionAccessToken!: string;
    public intervalId!: string;
}

AreaSpecific.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        areaId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        actionAccessToken: {
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

export { AreaSpecific };
