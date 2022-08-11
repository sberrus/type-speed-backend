import { Request, Response } from "express";

const registerStats = async (req: Request, res: Response) => {
	const username = req.body["username"];

	// check if user have any stats

	// check if stats received are better than user`s best stats, in that case update je_ranking_table

	// save stats in user_ranking_table

	res.json({ ok: true });
};

export { registerStats as registerResult };
