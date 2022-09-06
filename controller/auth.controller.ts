import { Request, Response } from "express";
import createErrorResponse from "../helpers/createErrorResponse";
import generateJWT from "../helpers/generateJWT";
import { compareHash, generateHash } from "../helpers/hashing";
import User from "../model/user";

export const createUser = async (req: Request, res: Response) => {
	const {
		username,
		password,
		password_confirm,
		department,
		secret_question,
		secret,
	} = req.body;
	let passwordHash, secretHash;

	if (password !== password_confirm) {
		res.status(400).json(
			createErrorResponse("password and confirmation aren't same")
		);
		return;
	}
	// hash password
	passwordHash = generateHash(password);
	// hash secret
	secretHash = generateHash(secret);

	// save data into bbdd
	let user;
	try {
		user = await User.create({
			username,
			password: passwordHash,
			secret_question,
			department,
			secret: secretHash,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(createErrorResponse("Server Error"));
		return;
	}

	try {
		const token = await generateJWT(username);
		res.json({ user: { username, secret_question }, token });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Server error in auth.controller"));
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	let user;

	// check if user exists
	try {
		user = await User.findOne({ where: { username } });
		if (!user) {
			return res
				.status(404)
				.json(createErrorResponse(`username ${username}, not found`));
		}
	} catch (error: any) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse(`Server error in auth-controller`));
	}

	// compare passwords
	const hashedPassword = user.get("password") as string;
	const validPassword = await compareHash(password, hashedPassword);
	if (!validPassword) {
		return res.status(401).json(createErrorResponse("Incorrect Password"));
	}

	// generate JWT
	try {
		// payload data
		const token = await generateJWT(user.get("username") as string);
		const username = user.get("username");
		const secret_question = user.get("secret_question");

		res.json({ user: { username, secret_question }, token });
	} catch (error) {
		console.log(error);
		res.json(createErrorResponse("Server Error in auth-controller"));
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	const { username, password, password_confirm, secret } = req.body;

	let user;
	// check if user exists
	try {
		user = await User.findOne({ where: { username } });
		if (!user)
			return res
				.status(404)
				.json(createErrorResponse(`username ${username}, not found`));
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse(`Server error in auth-controller`));
	}

	// check if secret is correct
	const isValidSecret = await compareHash(
		secret,
		user.get("secret") as string
	);
	if (!isValidSecret) {
		return res.status(400).json(createErrorResponse("secret is not valid"));
	}
	// validate password
	if (password !== password_confirm) {
		return res
			.status(400)
			.json(
				createErrorResponse(
					"password and password confirmation aren't same"
				)
			);
	}
	// change password
	const hashedPassword = generateHash(password);
	user.set({ password: hashedPassword });
	try {
		await user.save();
		return res.json({ ok: true, msg: "password changed succesfully!" });
	} catch (error) {}
};

export const changePassword = async (req: Request, res: Response) => {
	const { password, password_confirm, secret } = req.body;
	const { uid: username } = req.token;

	let user;
	// check if user exists
	try {
		user = await User.findOne({ where: { username } });
		if (!user)
			return res
				.status(404)
				.json(createErrorResponse(`username ${username}, not found`));
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse(`Server error in auth-controller`));
	}

	// check if secret is correct
	const isValidSecret = await compareHash(
		secret,
		user.get("secret") as string
	);
	if (!isValidSecret) {
		return res.status(400).json(createErrorResponse("secret is not valid"));
	}
	// validate password
	if (password !== password_confirm) {
		return res
			.status(400)
			.json(
				createErrorResponse(
					"password and password confirmation aren't same"
				)
			);
	}
	// change password
	const hashedPassword = generateHash(password);
	user.set({ password: hashedPassword });
	try {
		await user.save();
		return res.json({ ok: true, msg: "password changed succesfully!" });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Error in auth.controller"));
	}
};

export const changeSecret = async (req: Request, res: Response) => {
	const { new_secret, secret_confirm, old_secret } = req.body;
	const { uid: username } = req.token;

	let user;
	// check if user exists
	try {
		user = await User.findOne({ where: { username } });
		if (!user)
			return res
				.status(404)
				.json(createErrorResponse(`username ${username}, not found`));
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse(`Server error in auth-controller`));
	}

	// check if secret is correct
	const isValidSecret = await compareHash(
		old_secret,
		user.get("secret") as string
	);
	if (!isValidSecret) {
		return res
			.status(400)
			.json(createErrorResponse("old secret provided is not valid"));
	}
	// validate password
	if (new_secret !== secret_confirm) {
		return res
			.status(400)
			.json(
				createErrorResponse(
					"new secret and secret confirmation aren't same"
				)
			);
	}
	// change password
	const newHashedSecret = generateHash(new_secret);
	user.set({ secret: newHashedSecret });
	try {
		await user.save();
		return res.json({ ok: true, msg: "secret changed succesfully!" });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Error in auth.controller"));
	}
};
