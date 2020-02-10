import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
        logging: false
    }
);

sequelize
    .authenticate()
    .then(() =>
        console.log(
            'Connection to the database has been established successfully.'
        )
    )
    .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;
