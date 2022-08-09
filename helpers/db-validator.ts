// Model
import User from "../model/user.model";

/**
 * Check if user already exist in users table and throws error if found.
 * @param username table´s Primary Key
 */
export const userExists = async (username: string) => {
	let user;
	try {
		user = await User.findByPk(username);
	} catch (error: any) {
		console.log(error);
		throw new Error("Server Error in db-validator");
	}
	if (user) {
		throw new Error(`username ${username}, already exists`);
	}
};
//
