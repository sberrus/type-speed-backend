import { Router } from "express";
import { body } from "express-validator";
import { registerResult } from "../controller/ranking.controller";
import { userExists } from "../helpers/db-validator";
import validateJWT from "../middleware/validateJWT";
import validateRequest from "../middleware/validateRequest";

const rankingRouter = Router();

rankingRouter.post(
	"/",
	validateJWT,
	[
		body("username").exists().withMessage("Field required").custom(userExists),
		body("words_per_minute")
			.exists()
			.withMessage("Field required")
			.isNumeric()
			.withMessage("The value must be number"),
		body("total_chart_success_count")
			.exists()
			.withMessage("Field required")
			.isNumeric()
			.withMessage("The value must be number"),
		body("charts_per_minute")
			.exists()
			.withMessage("Field required")
			.isNumeric()
			.withMessage("The value must be number"),
		body("error_count").exists().withMessage("Field required").isNumeric().withMessage("The value must be number"),
		body("created_at").exists().withMessage("Field required"),
		validateRequest,
	],
	registerResult
);

export default rankingRouter;
