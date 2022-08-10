import { Router } from "express";
import { body } from "express-validator";
import { registerResult } from "../controller/ranking.controller";
import validateRequest from "../middleware/validateRequest";

const rankingRouter = Router();

rankingRouter.post(
  "/",
  [
    body("id").exists().withMessage("Field required"),
    body("total_words_count")
      .exists()
      .withMessage("Field required")
      .isNumeric()
      .withMessage("The value must be number"),
    body("errors_word_count")
      .exists()
      .withMessage("Field required")
      .isNumeric()
      .withMessage("The value must be number"),
    body("success_word_count")
      .exists()
      .withMessage("Field required")
      .isNumeric()
      .withMessage("The value must be number"),
    body("created_at").exists().withMessage("Field required"),
    validateRequest,
  ],
  registerResult
);

export default rankingRouter;
