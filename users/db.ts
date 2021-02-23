import {Model, Sequelize} from 'sequelize-typescript';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: Number.parseInt(process.env.POSTGRES_PORT, 10),
    define: {
        freezeTableName: true,
        timestamps: true,
    },
    // poodl: {
    //     max: 10,
    //     min: 0,
    //     idle: 10 * 1000,
    // },
});
sequelize.addModels([
    'src/models/role.model',
    'src/models/user.model',
    'src/models/permission.model'
]);

export { sequelize };