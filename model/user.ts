import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const User = sequelizeConnection.define("je_users", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  secret_question: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.ENUM("support"),
  },
  secret: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
});

export default User;
