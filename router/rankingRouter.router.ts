import { Router } from "express";
import { body } from "express-validator";
import { getRanking, registerScore } from "../controller/ranking.controller";
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

rankingRouter.get("/", validateJWT, getRanking);

export default rankingRouter;
