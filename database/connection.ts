import { Dialect, Sequelize } from "sequelize";

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: 3306,
  pool: { max: 50, min: 0, acquire: 30000, idle: 300000 },
  dialect: "mariadb",
  logging: false,
});

export default sequelizeConnection;
