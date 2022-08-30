// imports
import { Request, Response } from "express";
import { Model } from "sequelize/types";
// models
import Ranking from "../model/ranking";
import UserRanking from "../model/user_ranking";
// helpers
import isNewScore from "../helpers/checkScores";
import createErrorResponse from "../helpers/createErrorResponse";
// types
export type StatsType = {
	id: string;
	words_per_minute: number;
	valid_words: number;
	wrong_words: number;
};
export const registerScore = async (req: Request, res: Response) => {
	// body
	const { id, words_per_minute, valid_words, wrong_words } = req.body;
	// headers
	const userToken = req.tokenUid;

	// scores
	let currentScore, bestScore: Model<any, any> | null;

	// check if user id is same as the uid token provided
	if (userToken?.uid !== id) {
		return res
			.status(401)
			.json(createErrorResponse("Token provided is not valid"));
	}
	// check if user have any score
	try {
		currentScore = req.body;
		bestScore = await Ranking.findByPk(id);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(createErrorResponse("Server Error in ranking-controller"));
	}

	// if user have no score saved create first scores
	if (!bestScore) {
		try {
			// create first score
			await UserRanking.create({
				id,
				words_per_minute,
				valid_words,
				wrong_words,
			});
			// create first best score
			await Ranking.create({
				id,
				words_per_minute,
				valid_words,
				wrong_words,
			});

			return res.json({ ok: true, msg: "Score saved!" });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json(
					createErrorResponse("Server error in ranking-controller")
				);
		}
	}

	// if user have scores saved
	// check if current score is better than best score, in that case update best score
	let newBestScore;
	if (isNewScore(currentScore, bestScore)) {
		// update best score
		bestScore?.set({ ...currentScore });
		try {
			newBestScore = await bestScore?.save();
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json(
					createErrorResponse("Server error in ranking - controller")
				);
		}
	}

	try {
		// add new score
		await UserRanking.create(currentScore);
	} catch (error) {
		return res
			.status(500)
			.json(createErrorResponse("Server error un ranking - controller"));
	}
	return res.json({
		ok: true,
		msg: "Score saved!",
		newBestScore: !!newBestScore,
	});
};

export const getRanking = async (req: Request, res: Response) => {
	// get the ranking ordered by words_per_minute limited by 10
	const userID = req.query["id"];
	let result;
	if (userID) {
		result = await UserRanking.findAll({
			where: { id: userID },
			order: [["words_per_minute", "DESC"]],
			limit: 10,
		});
	} else {
		result = await Ranking.findAll({
			order: [["words_per_minute", "DESC"]],
			limit: 10,
		});
	}
	res.json({ result });
};
