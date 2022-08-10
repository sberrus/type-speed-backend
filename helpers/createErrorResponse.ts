const createErrorResponse = (msg: string) => {
	return {
		ok: false,
		errors: [{ msg }],
	};
};
export default createErrorResponse;
