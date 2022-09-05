// imports
import { Request, Response } from "express";
import { Model } from "sequelize/types";
// models
import Ranking from "../model/ranking";
import UserRanking from "../model/user_ranking";
// helpers
import createErrorResponse from "../helpers/createErrorResponse";
import { formatter, isBestScore } from "../helpers/Scores";

/**
 * register new score record
 * @returns
 */
export const registerScore = async (req: Request, res: Response) => {
	// body
	const { id } = req.body;
	// token parsed header
	const { uid } = req.token;

	// scores
	const currentScore = formatter(req.body);
	let bbddBestScore: Model<any, any> | null;

	// check if user id is same as the uid token provided
	if (uid !== id) {
		return res
			.status(401)
			.json(createErrorResponse("Token provided is not valid"));
	}

	// get Best Score
	try {
		bbddBestScore = await Ranking.findByPk(uid);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}

	// [if user have no scores saved]
	// create new user score and best score
	if (!bbddBestScore) {
		try {
			await Ranking.create(currentScore);
			await UserRanking.create(currentScore);
			return res.json({
				ok: true,
				msg: "Score Saved",
				isNewScore: true,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json(
					createErrorResponse("Server error un ranking.controller")
				);
		}
	}

	// [if user have scores saved]
	let _isBestScore;
	if (bbddBestScore) {
		_isBestScore = isBestScore(currentScore, bbddBestScore.toJSON());
		try {
			if (_isBestScore) {
				bbddBestScore.set(currentScore);
				await bbddBestScore.save();
				await UserRanking.create(currentScore);
			} else {
				await UserRanking.create(currentScore);
			}
			return res.json({
				ok: true,
				msg: "Score Saved",
				isBestScore: _isBestScore,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json(
					createErrorResponse("Server error in ranking.controller")
				);
		}
	}
};

/**
 * retrieves the current best scores`s top ten scores
 * @returns
 */
export const getTopTen = async (req: Request, res: Response) => {
	// get the ranking ordered by words_per_minute limited by 10
	try {
		const result = await Ranking.findAll({
			order: [["words_per_minute", "DESC"]],
			limit: 10,
		});
		return res.json({ result });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}
};

/**
 * retrieves user`s top ten score
 * @returns
 */
export const getUserRanking = async (req: Request, res: Response) => {
	const id = req.params.id;
	const { uid } = req.token;
	let result;

	if (id !== uid) {
		return res.status(404).json(createErrorResponse("Token not valid"));
	}

	try {
		result = await UserRanking.findAll({
			where: { id },
			order: [["words_per_minute", "DESC"]],
			limit: 10,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}

	res.json({ result });
};

/**
 * retrieves best scores top ten scores sorted by category
 * @returns
 */
export const getTopTenByCategory = async (req: Request, res: Response) => {
	// ask for category to sort it the results by it
	const categoriesAllowed = [
		"words_per_minute",
		"letters_per_second",
		"accuracy",
	];
	const category = req.params.category;

	// check if the category is valid
	if (!categoriesAllowed.includes(category)) {
		return res
			.status(404)
			.json(createErrorResponse(`Category ${category}, doesn't exists`));
	}

	try {
		if (category === "words_per_minute") {
			const result = await Ranking.findAll({
				order: [
					[category, "DESC"],
					["accuracy", "DESC"],
				],
				limit: 10,
			});
			return res.json({ result });
		} else if (category === "letters_per_second") {
			const result = await Ranking.findAll({
				order: [
					[category, "DESC"],
					["accuracy", "DESC"],
				],
				limit: 10,
			});
			return res.json({ result });
		} else if (category === "accuracy") {
			const result = await Ranking.findAll({
				order: [
					[category, "DESC"],
					["words_per_minute", "DESC"],
				],
				limit: 10,
			});
			return res.json({ result });
		}
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}
};
