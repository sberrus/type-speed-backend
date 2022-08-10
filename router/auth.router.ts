//Imports
import { NextFunction, Request, Response, Router } from "express";
import { body, check } from "express-validator";
// //helpers
import { userNotExists } from "../helpers/db-validator";
// //middlewares
import validateRequest from "../middleware/validateRequest";
// //controllers
import { createUser, forgotPassword, login } from "../controller/auth.controller";

//rutas
export const authRouter = Router();

authRouter.post(
	"/login",
	(req: Request, res: Response, next: NextFunction) => {
		console.log(req.body);
		next();
	},
	[
		body("username")
			.exists()
			.withMessage("username field required")
			.isLength({ max: 20 })
			.withMessage("username max-lenght 20")
			.trim(),
		body("password")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255 })
			.withMessage("password max-lenght 255")
			.trim(),
		validateRequest,
	],
	login
);

authRouter.post(
	"/register",
	[
		check("username")
			.exists()
			.withMessage("username field required")
			.isLength({ max: 20 })
			.withMessage("username max-lenght 20")
			.trim()
			.escape()
			.custom(userNotExists)
			.bail(),
		check("password")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255 })
			.withMessage("password max-lenght 255")
			.trim(),
		check("password_confirm")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255 })
			.withMessage("password max-lenght 255")
			.trim(),
		check("secret_question")
			.exists()
			.withMessage("secret_question field required")
			.isLength({ max: 255 })
			.withMessage("secret_question max-lenght 255")
			.trim()
			.escape(),
		check("secret")
			.exists()
			.withMessage("secret field required")
			.isLength({ max: 255 })
			.withMessage("secret max-lenght 255")
			.trim()
			.escape(),
		validateRequest,
	],
	createUser
);

authRouter.post(
	"/forgot-password",
	[
		check("username")
			.exists()
			.withMessage("username field required")
			.isLength({ max: 20 })
			.withMessage("username max-lenght 20")
			.trim()
			.escape(),
		check("password")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255 })
			.withMessage("password max-lenght 255")
			.trim(),
		check("password_confirm")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255 })
			.withMessage("password max-lenght 255")
			.trim(),
		check("secret")
			.exists()
			.withMessage("secret field required")
			.isLength({ max: 255 })
			.withMessage("secret max-lenght 255")
			.trim()
			.escape(),
		validateRequest,
	],
	forgotPassword
);
