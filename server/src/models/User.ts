import {
    DataTypes,
    Model,
    HasManyCreateAssociationMixin,
    Association
} from 'sequelize';

import sequelize from '../database';
import { AreaGeneric } from './AreaGeneric';
import { AreaSpecific } from './AreaSpecific';

class User extends Model {
    public id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;

    public genericAreas?: AreaGeneric[];
    public specificAreas?: AreaSpecific[];

    public createGenericArea!: HasManyCreateAssociationMixin<AreaGeneric>;
    public createSpecificArea!: HasManyCreateAssociationMixin<AreaSpecific>;

    public static associations: {
        genericAreas: Association<User, AreaGeneric>;
        specificAreas: Association<User, AreaSpecific>;
    };
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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

User.hasMany(AreaGeneric, {
    foreignKey: 'userId',
    as: 'genericAreas'
});
// AreaGeneric.belongsTo(User);

User.hasMany(AreaSpecific, {
    foreignKey: 'userId',
    as: 'specificAreas'
});
// AreaSpecific.belongsTo(User);

sequelize
    .sync({
        force: true
    })
    .then(value => console.log(value.models, ' are synchronized'));

export default User;
