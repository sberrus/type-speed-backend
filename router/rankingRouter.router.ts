import { Router } from "express";
import { body } from "express-validator";
import { registerResult } from "../controller/ranking.controller";
import validateRequest from "../middleware/validateRequest";

const rankingRouter = Router();

// TODO: create a custom validator to validate if user have enought attempts available.
rankingRouter.post(
  "/",
  [
    body("id").notEmpty().withMessage("Field required"),
    body("total_words_count")
      .notEmpty()
      .withMessage("Field required")
      .isNumeric()
      .withMessage("The value must be number"),
    body("errors_word_count")
      .notEmpty()
      .withMessage("Field required")
      .isNumeric()
      .withMessage("The value must be number"),
    body("success_word_count")
      .notEmpty()
      .withMessage("Field required")
      .isNumeric()
      .withMessage("The value must be number"),
    body("created_at")
      .notEmpty()
      .withMessage("Field required")
      .isNumeric()
      .withMessage("The value must be number"),
    validateRequest,
  ],
  registerResult
);

export default rankingRouter;
