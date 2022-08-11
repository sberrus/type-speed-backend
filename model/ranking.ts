import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const Ranking = sequelizeConnection.define("je_ranking", {
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

export default Ranking;
