import { Router } from "express";
import { body } from "express-validator";
import {
	getTopTen,
	getTopTenByCategory,
	getUserRanking,
	registerScore,
} from "../controller/ranking.controller";
import { userExists } from "../helpers/db-validator";
import validateJWT from "../middleware/validateJWT";
import validateRequest from "../middleware/validateRequest";

const rankingRouter = Router();

/**
 * register new score
 */
rankingRouter.post(
	"/",
	validateJWT,
	[
		body("id").exists().withMessage("Field required").custom(userExists),
		body("words_per_minute")
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

rankingRouter.get("/", getTopTen);

rankingRouter.get("/:id", validateJWT, getUserRanking);

rankingRouter.get("/category/:category", getTopTenByCategory);

export default rankingRouter;
