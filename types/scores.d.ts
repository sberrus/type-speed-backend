export type RawStatsType = {
	id: string;
	total_words: number;
	total_letters: number;
	valid_words: number;
	wrong_words: number;
};

export type StatsType = {
	id: string;
	words_per_minute: number;
	letters_per_second: number;
	accuracy: number;
};

export type FormatterType = ({}: RawStatsType) => StatsType;
