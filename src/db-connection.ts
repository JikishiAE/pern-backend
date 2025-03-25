import { Sequelize } from "sequelize-typescript";
import { envs } from "./config/env";

const sequelize = new Sequelize({
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    host: envs.DB_HOST,
    logging: false,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
    },
    dialect: "postgres",
    models: [__dirname + "/models"],
});

export default sequelize;