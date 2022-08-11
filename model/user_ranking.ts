import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const UserRanking = sequelizeConnection.define("je_user_ranking", {
	username: {
		type: DataTypes.STRING,
	},
	words_per_minute: {
		type: DataTypes.NUMBER,
	},
	total_chart_success_count: {
		type: DataTypes.NUMBER,
	},
	charts_per_minute: {
		type: DataTypes.NUMBER,
	},
	error_count: {
		type: DataTypes.NUMBER,
	},
	created_at: {
		type: DataTypes.DATE,
	},
});

export default UserRanking;
