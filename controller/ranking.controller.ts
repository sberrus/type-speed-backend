// imports
import { Request, Response } from "express";
import { Model, WhereOptions } from "sequelize/types";
// models
import Ranking from "../model/ranking";
import UserRanking from "../model/user_ranking";
// helpers
import createErrorResponse from "../helpers/createErrorResponse";
import { formatter, isBestScore } from "../helpers/Scores";
import User from "../model/user";

/**
 * register new score record
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
		console.log(
			"🚀 ~ file: ranking.controller.ts ~ line 36 ~ registerScore ~ error",
			error
		);
		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}

	// [if user have no scores saved]
	// create new user score and best score
	if (!bbddBestScore) {
		try {
			// check if current score LPS is valid
			if (currentScore.words_per_minute > 25) {
				await Ranking.create(currentScore);
			}
			await UserRanking.create(currentScore);
			return res.json({
				ok: true,
				msg: "Score Saved",
				isNewScore: true,
				isRankingValid: currentScore.words_per_minute > 25,
			});
		} catch (error) {
			console.log(
				"🚀 ~ file: ranking.controller.ts ~ line 60 ~ registerScore ~ error",
				error
			);
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
				// check if wpm is valid to save
				if (currentScore.words_per_minute > 25) {
					bbddBestScore.set(currentScore);
					await bbddBestScore.save();
				}

				await UserRanking.create(currentScore);
			} else {
				await UserRanking.create(currentScore);
			}
			return res.json({
				ok: true,
				msg: "Score Saved",
				isBestScore: _isBestScore,
				isRankingValid: currentScore.words_per_minute > 25,
			});
		} catch (error) {
			console.log(
				"🚀 ~ file: ranking.controller.ts ~ line 94 ~ registerScore ~ error",
				error
			);
			return res
				.status(500)
				.json(
					createErrorResponse("Server error in ranking.controller")
				);
		}
	}
};

/**
 * retrieves the current top ten best scores`s
 */
export const getTopTen = async (req: Request, res: Response) => {
	try {
		// get participants by city
		const cityQuery = req.query.city;
		if (cityQuery) {
			const participants = await User.findAll({
				where: {
					city: cityQuery,
				},
			});
			const cityParticipants = participants.map(
				(participant) => participant.toJSON().username
			);

			// Filter parcicipants by city and limit by 10
			const result = await Ranking.findAll({
				order: [["words_per_minute", "DESC"]],
				where: { id: cityParticipants },
				limit: 10,
			});

			return res.json({ result });
		}

		// get the ranking ordered by words_per_minute limited by 10
		const result = await Ranking.findAll({
			order: [["words_per_minute", "DESC"]],
			limit: 10,
		});
		return res.json({ result });
	} catch (error) {
		console.log(
			"🚀 ~ file: ranking.controller.ts ~ line 143 ~ getTopTen ~ error",
			error
		);

		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}
};

/**
 * retrieves user`s top ten score
 */
export const getUserRanking = async (req: Request, res: Response) => {
	// params
	const id = req.params.id;
	// token
	const { uid } = req.token;

	//
	let result;

	// validate if req token is same as headers token
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
		console.log(
			"🚀 ~ file: ranking.controller.ts ~ line 150 ~ getUserRanking ~ error",
			error
		);
		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}

	res.json({ result });
};

/**
 * retrieves best scores top ten scores sorted by category
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

	// filter participants by city

	// query
	const cityQuery = req.query.city;
	console.log(cityQuery);

	let cityParticipantsFilter: WhereOptions;
	if (cityQuery) {
		const participants = await User.findAll({
			where: {
				city: cityQuery,
			},
		});
		const cityParticipants = participants.map(
			(participant) => participant.toJSON().username
		);

		cityParticipantsFilter = {
			id: cityParticipants,
		};
	} else {
		cityParticipantsFilter = {};
	}

	try {
		if (category === "words_per_minute") {
			const result = await Ranking.findAll({
				order: [
					[category, "DESC"],
					["accuracy", "DESC"],
				],
				where: {
					...cityParticipantsFilter,
				},
				limit: 10,
			});
			return res.json({ result });
		} else if (category === "letters_per_second") {
			const result = await Ranking.findAll({
				order: [
					[category, "DESC"],
					["accuracy", "DESC"],
				],
				where: {
					...cityParticipantsFilter,
				},
				limit: 10,
			});
			return res.json({ result });
		} else if (category === "accuracy") {
			const result = await Ranking.findAll({
				order: [
					[category, "DESC"],
					["words_per_minute", "DESC"],
				],
				where: {
					...cityParticipantsFilter,
				},
				limit: 10,
			});
			return res.json({ result });
		}
	} catch (error) {
		console.log(
			"🚀 ~ file: ranking.controller.ts ~ line 212 ~ getTopTenByCategory ~ error",
			error
		);
		return res
			.status(500)
			.json(createErrorResponse("Server error in ranking.controller"));
	}
};
