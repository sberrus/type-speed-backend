import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createErrorResponse from "../helpers/createErrorResponse";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
	// get token
	const token = req.headers["x-token"] as string;
	// token exists
	if (!token) {
		return res.status(401).json(createErrorResponse("Token not provided"));
	}

	// validate
	try {
		jwt.verify(token, JWT_PRIVATE_KEY);
	} catch (error) {
		console.log(error);
		return res.status(401).json(createErrorResponse("Token not valid"));
	}

	next();
};

export default validateJWT;
