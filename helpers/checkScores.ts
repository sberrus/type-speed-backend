import { Model } from "sequelize/types";

type CurrentScoreType = {
	username: string;
	words_per_minute: number;
	total_chart_count: number;
	charts_per_minute: number;
	error_count: number;
	createdAt: string;
};

const isNewScore = (currentScore: CurrentScoreType, bestScore: Model<any, any> | null) => {
	// Words Per Minute
	const currentWPM = Number(currentScore.words_per_minute);
	const bestWPM = Number(bestScore?.get("words_per_minute"));

	// Charts Per Minute
	const currentCPM = Number(currentScore.charts_per_minute);
	const bestCPM = Number(bestScore?.get("charts_per_minute"));

	// Total Chart Count
	const currentTCC = Number(currentScore.error_count);
	const bestTCC = Number(bestScore?.get("error_count"));

	// Error Count
	const currentEC = Number(currentScore.error_count);
	const bestEC = Number(bestScore?.get("error_count"));

	// Accuracy (total_chart_count / error_count)
	const currentAccuracy = currentTCC / currentEC;
	const bestAccuracy = bestTCC / bestEC;

	// check WPM are equal
	if (currentWPM === bestWPM) {
		// check if CPM are equal
		if (currentCPM === bestCPM) {
			// check if Acuracy are equal
			if (currentAccuracy === bestAccuracy) {
				return false;
			}
		} else {
			if (currentCPM > bestCPM) {
				return true;
			}
			return false;
		}
	} else {
		if (currentWPM > bestWPM) {
			return true;
		}
		return false;
	}
};

export default isNewScore;
