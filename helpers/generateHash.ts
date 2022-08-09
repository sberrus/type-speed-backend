import bcrypt from "bcrypt";

export const generateHash = (secret: string) => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(secret, salt);
};
