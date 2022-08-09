//Imports
import { Router } from "express";
import { check } from "express-validator";
import { createUser } from "../controller/auth.controller";
import { userExists } from "../helpers/db-validator";
// //helpers
// //middlewares
import validateRequest from "../middleware/validateRequest";
// //controllers
// import { login } from "../controllers/auth";

//rutas
export const authRouter = Router();

authRouter.post(
	"/",
	[
		check("username")
			.exists()
			.withMessage("username field required")
			.isLength({ max: 20 })
			.withMessage("username max-lenght 20")
			.trim()
			.escape()
			.custom(userExists)
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
