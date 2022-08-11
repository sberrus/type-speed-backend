import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const Ranking = sequelizeConnection.define("je_ranking", {
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

export default Ranking;
