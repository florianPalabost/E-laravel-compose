import {Model, Sequelize} from 'sequelize-typescript';
import {User} from "../angular/src/app/features/user/models/user";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: Number.parseInt(process.env.POSTGRES_PORT, 10),
    models: [__dirname + '/models/*.model.ts'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
    define: {
        freezeTableName: true,
        timestamps: true,
    },
    // psool: {
    //     max: 10,
    //     min: 0,
    //     idle: 10 * 1000,
    // },
});

sequelize.addModels(['models/user.model']);


export { sequelize };