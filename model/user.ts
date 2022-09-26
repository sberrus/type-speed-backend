import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const User = sequelizeConnection.define("je_users", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	secret_question: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: DataTypes.ENUM("madrid", "cali"),
		allowNull: false,
	},
	department: {
		type: DataTypes.ENUM("support"),
		allowNull: false,
	},
	secret: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.TIME,
	},
	updatedAt: {
		type: DataTypes.TIME,
	},
});

export default User;
