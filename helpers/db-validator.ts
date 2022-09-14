// Model
import User from "../model/user";

/**
 * Check if user already exist in users table and throws error if found.
 * @param username
 */
export const userNotExists = async (username: string) => {
	let user;
	try {
		user = await User.findByPk(username);
	} catch (error: any) {
		console.log(
			"🚀 ~ file: db-validator.ts ~ line 13 ~ userNotExists ~ error",
			error
		);
		throw new Error("Server Error in db-validator");
	}
	if (user) {
		throw new Error(`username ${username}, already exists`);
	}
};

/**
 * Checks if users exists in DB and throws error if not found
 * @param username
 */
export const userExists = async (username: string) => {
	let user;
	try {
		user = await User.findByPk(username);
	} catch (error: any) {
		console.log(
			"🚀 ~ file: db-validator.ts ~ line 33 ~ userExists ~ error",
			error
		);
		throw new Error("Server Error in db-validator");
	}
	if (!user) {
		throw new Error(`username ${username}, not found`);
	}
};
