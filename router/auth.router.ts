//Imports
import { NextFunction, Request, Response, Router } from "express";
import { body, check } from "express-validator";
// //helpers
import { userNotExists } from "../helpers/db-validator";
// //middlewares
import validateRequest from "../middleware/validateRequest";
// //controllers
import {
	changeSecret,
	createUser,
	forgotPassword,
	login,
} from "../controller/auth.controller";
import validateJWT from "../middleware/validateJWT";

//rutas
export const authRouter = Router();

authRouter.post(
	"/login",
	[
		body("username")
			.exists()
			.withMessage("username field required")
			.isLength({ max: 20, min: 5 })
			.withMessage("username lenght between 5 - 20")
			.trim(),
		body("password")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255, min: 5 })
			.withMessage("password lenght between 5 - 255")
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
			.isLength({ max: 20, min: 5 })
			.withMessage("username lenght between 5 - 20")
			.trim()
			.escape()
			.custom(userNotExists)
			.bail(),
		check("password")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255, min: 5 })
			.withMessage("password lenght between 5 - 255")
			.trim(),
		check("password_confirm")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255, min: 5 })
			.withMessage("password lenght between 5 - 255")
			.trim(),
		check("department")
			.exists()
			.withMessage("department field required")
			.isIn(["support"])
			.withMessage("department field provided is not valid")
			.trim(),
		check("secret_question")
			.exists()
			.withMessage("secret_question field required")
			.isLength({ max: 255, min: 5 })
			.withMessage("secret_question lenght between 5 - 255")
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
			.isLength({ min: 5, max: 20 })
			.withMessage("username length between 5 - 20")
			.trim()
			.escape(),
		check("password")
			.exists()
			.withMessage("password field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("password length between 5 - 255")
			.trim(),
		check("password_confirm")
			.exists()
			.withMessage("password field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("password length between 5 - 255")
			.trim(),
		check("secret")
			.exists()
			.withMessage("secret field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("secret length between 5 - 255")
			.trim()
			.escape(),
		validateRequest,
	],
	forgotPassword
);

authRouter.post(
	"/change-password",
	[
		validateJWT,
		check("password")
			.exists()
			.withMessage("password field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("password length between 5 - 255")
			.trim(),
		check("password_confirm")
			.exists()
			.withMessage("password field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("password length between 5 - 255")
			.trim(),
		check("secret")
			.exists()
			.withMessage("secret field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("secret length between 5 - 255")
			.trim(),
		validateRequest,
	],
	changeSecret
);

authRouter.post(
	"/change-secret",
	[
		validateJWT,
		check("old_secret")
			.exists()
			.withMessage("old_secret field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("secret length between 5 - 255")
			.trim(),
		check("new_secret")
			.exists()
			.withMessage("new_secret field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("secret length between 5 - 255")
			.trim(),
		check("secret_confirm")
			.exists()
			.withMessage("secret_confirm field required")
			.isLength({ min: 5, max: 255 })
			.withMessage("secret_confirm length between 5 - 255")
			.trim(),
		validateRequest,
	],
	changeSecret
);
