import { Request, Response } from "express";
import createErrorResponse from "../helpers/createErrorResponse";
import generateJWT from "../helpers/generateJWT";
import { compareHash, generateHash } from "../helpers/hasing";
import User from "../model/user.model";

export const createUser = async (req: Request, res: Response) => {
	const { username, password, password_confirm, secret_question, secret } = req.body;
	let passwordHash, secretHash;

	if (password !== password_confirm) {
		res.status(400).json(createErrorResponse("password and confirmation aren't same"));
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
		res.status(500).json(createErrorResponse("Server Error"));
		return;
	}

	res.json({ ok: true, msg: `User ${username} successfully created!` });
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	let user;

	// check if user exists
	try {
		user = await User.findOne({ where: { username } });
		if (!user) {
			return res.status(404).json(createErrorResponse(`username ${username}, not found`));
		}
	} catch (error: any) {
		console.log(error);
		return res.status(500).json(createErrorResponse(`Server error in auth-controller`));
	}

	// compare passwords
	const hashedPassword = user.get("password") as string;
	const validPassword = await compareHash(password, hashedPassword);
	if (!validPassword) {
		return res.status(401).json(createErrorResponse("Incorrect Password"));
	}

	// generate JWT
	try {
		const token = await generateJWT(user.get("username") as string);

		res.json({ ok: true, token });
	} catch (error) {
		console.log(error);
		res.json(createErrorResponse("Server Error in auth-controller"));
	}
};

export const forgotPassword = () => {
	// TODO:
	// check if user exists
	// check if secret is correct
	// change password
};
