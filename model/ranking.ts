import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const Ranking = sequelizeConnection.define("je_ranking", {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	words_per_minute: {
		type: DataTypes.NUMBER,
	},
	valid_words: {
		type: DataTypes.NUMBER,
	},
	wrong_words: {
		type: DataTypes.NUMBER,
	},
});

export default Ranking;
