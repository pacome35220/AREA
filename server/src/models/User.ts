import { DataTypes, Model } from 'sequelize';

import sequelize from '../database';

class User extends Model {
    public id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    { sequelize }
);

User.sync({ force: true });

export default User;
