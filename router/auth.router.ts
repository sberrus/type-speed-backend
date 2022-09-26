//Imports
import { Router } from "express";
import { body, check } from "express-validator";
// //helpers
import { userNotExists } from "../helpers/db-validator";
import validateUsername from "../helpers/validateUsername";
// //middlewares
import validateRequest from "../middleware/validateRequest";
import validateJWT from "../middleware/validateJWT";
// //controllers
import {
	changePassword,
	changeSecret,
	createUser,
	forgotPassword,
	login,
} from "../controller/auth.controller";

//rutas
export const authRouter = Router();

// login
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
// register
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
			.custom(validateUsername)
			.bail()
			.custom(userNotExists)
			.bail(),
		check("password")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255, min: 5 })
			.withMessage("password lenght between 5 - 255")
			.trim()
			.bail(),
		check("password_confirm")
			.exists()
			.withMessage("password field required")
			.isLength({ max: 255, min: 5 })
			.withMessage("password lenght between 5 - 255")
			.trim()
			.bail(),
		check("city")
			.exists()
			.withMessage("city field required")
			.isIn(["madrid", "cali"])
			.withMessage("city field provided is not valid")
			.trim()
			.bail(),
		check("department")
			.exists()
			.withMessage("department field required")
			.isIn(["support"])
			.withMessage("department field provided is not valid")
			.trim()
			.bail(),
		check("secret_question")
			.exists()
			.withMessage("secret_question field required")
			.isLength({ max: 255, min: 5 })
			.withMessage("secret_question lenght between 5 - 255")
			.trim()
			.escape()
			.bail(),
		check("secret")
			.exists()
			.withMessage("secret field required")
			.isLength({ max: 255 })
			.withMessage("secret max-lenght 255")
			.trim()
			.escape()
			.bail(),
		validateRequest,
	],
	createUser
);
// forgot-password
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
// change-password
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
	changePassword
);
// change-secret
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
