import { Request, Response } from "express";
import { generateHash } from "../helpers/generateHash";
import User from "../model/user.model";

export const createUser = async (req: Request, res: Response) => {
	const { username, password, password_confirm, secret_question, secret } = req.body;

	let passwordHash, secretHash;
	if (password !== password_confirm) {
		res.status(400).json({
			ok: false,
			errors: [
				{
					msg: "password and confirmation are not same",
				},
			],
		});
		return;
	}
	// hash password
	passwordHash = generateHash(password);
	// hash secret
	secretHash = generateHash(secret);

	// save data into bbdd
	try {
		await User.create({ username, password: passwordHash, secret_question, secret: secretHash });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			errors: [
				{
					msg: "Server Error",
				},
			],
		});
		return;
	}

	res.json({ ok: true, msg: `User ${username} successfully created!` });
};
