import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const UserRanking = sequelizeConnection.define("je_user_rankings", {
	username: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	words_per_minute: {
		type: DataTypes.NUMBER,
	},
	total_chart_count: {
		type: DataTypes.NUMBER,
	},
	charts_per_minute: {
		type: DataTypes.NUMBER,
	},
	error_count: {
		type: DataTypes.NUMBER,
	},
	createdAt: {
		type: DataTypes.DATE,
	},
});

export default UserRanking;
