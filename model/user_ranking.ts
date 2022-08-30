import { DataTypes } from "sequelize";
import sequelizeConnection from "../database/connection";

const UserRanking = sequelizeConnection.define("je_user_rankings", {
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

export default UserRanking;
