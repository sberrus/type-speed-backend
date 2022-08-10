import bcrypt from "bcrypt";

export const generateHash = (secret: string) => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(secret, salt);
};

export const compareHash = async (secret: string, hash: string) => {
	return await bcrypt.compare(secret, hash);
};
