import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const Ranking = sequelizeConnection.define("je_rankings", {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	words_per_minute: {
		type: DataTypes.NUMBER,
	},

	letters_per_second: {
		type: DataTypes.DECIMAL,
	},
	accuracy: {
		type: DataTypes.DECIMAL,
	},
});

export default Ranking;
