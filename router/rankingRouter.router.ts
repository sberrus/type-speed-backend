import { Router } from "express";
import { body, query } from "express-validator";
import {
	getTopTen,
	getTopTenByCategory,
	getUserRanking,
	registerScore,
} from "../controller/ranking.controller";
import { userExists } from "../helpers/db-validator";
import validateJWT from "../middleware/validateJWT";
import validateRequest from "../middleware/validateRequest";

export const rankingRouter = Router();

/**
 * register new score
 */
rankingRouter.post(
	"/",
	validateJWT,
	[
		body("id").exists().withMessage("Field required").custom(userExists),
		body("total_words")
			.exists()
			.withMessage("Field required")
			.isNumeric()
			.withMessage("The value must be number"),
		body("total_letters")
			.exists()
			.withMessage("Field required")
			.isNumeric()
			.withMessage("The value must be number"),
		body("valid_words")
			.exists()
			.withMessage("Field required")
			.isNumeric()
			.withMessage("The value must be number"),
		body("wrong_words")
			.exists()
			.withMessage("Field required")
			.isNumeric()
			.withMessage("The value must be number"),
		validateRequest,
	],
	registerScore
);

rankingRouter.get(
	"/",
	[
		// params
		query("city").optional().default("madrid"),
	],
	getTopTen
);

rankingRouter.get("/:id", validateJWT, getUserRanking);

rankingRouter.get(
	"/category/:category",
	[
		// params
		query("city").optional().default("madrid"),
	],
	getTopTenByCategory
);
