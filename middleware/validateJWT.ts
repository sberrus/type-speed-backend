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
	const decoded = jwt.verify(token, JWT_PRIVATE_KEY);

	console.log(decoded);

	next();
};

export default validateJWT;
