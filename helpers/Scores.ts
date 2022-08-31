import { FormatterType, RawStatsType, StatsType } from "../types/scores";

export const formatter: FormatterType = (rawData: RawStatsType) => {
	// raw data
	const { id, total_words, total_letters, valid_words } = rawData;
	// initial value
	let results: StatsType = {
		id: "",
		words_per_minute: 0,
		letters_per_second: 0,
		accuracy: 0,
	};

	// ID
	results.id = id;
	// PPM
	results.words_per_minute = valid_words;
	// LPS
	results.letters_per_second = total_letters / 60 / 60;
	// ACCU
	if (valid_words === 0) {
		results.accuracy = 0;
	} else {
		results.accuracy = Number(valid_words / total_words);
	}

	return results;
};

/**
 * checks if the users current score is better scored than bbdd saved best score
 * @param currentScore score given from post
 * @param bbddBestScore score saved in bbdd
 * @returns
 */
export const isBestScore = (
	currentScore: StatsType,
	bbddBestScore: StatsType
) => {
	if (currentScore.words_per_minute > bbddBestScore.words_per_minute) {
		return true;
	}
	if (currentScore.accuracy > bbddBestScore.accuracy) {
		return true;
	}
	if (currentScore.letters_per_second > bbddBestScore.letters_per_second) {
		return true;
	}
	return false;
};
