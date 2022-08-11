import { Request, Response } from "express";
import { Model } from "sequelize/types";
import isNewScore from "../helpers/checkScores";
import createErrorResponse from "../helpers/createErrorResponse";
import Ranking from "../model/ranking";
import UserRanking from "../model/user_ranking";

const registerScore = async (req: Request, res: Response) => {
	const username = req.body["username"];

	// scores
	let currentScore, bestScore: Model<any, any> | null;
	try {
		// check if user have any score
		currentScore = req.body;
		bestScore = await Ranking.findByPk(username);
	} catch (error) {
		console.log(error);
		return res.status(500).json(createErrorResponse("Server Error in ranking-controller"));
	}

	// if user have no score saved create first scores
	if (!currentScore && !bestScore) {
		try {
			// create first score
			await UserRanking.create(req.body);
			// create first best score
			await Ranking.create(req.body);

			return res.json({ ok: true, msg: "Score saved!" });
		} catch (error) {
			return res.status(500).json(createErrorResponse("Server error in ranking-controller"));
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
			return res.status(500).json(createErrorResponse("Server error in ranking - controller"));
		}
	}

	try {
		// add new score
		await UserRanking.create(currentScore);
	} catch (error) {
		console.log(error);
		return res.status(500).json(createErrorResponse("Server error un ranking - controller"));
	}
	return res.json({ ok: true, msg: "Score saved!", newBestScore: !!newBestScore });
};

export { registerScore as registerResult };
