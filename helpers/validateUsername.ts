/**
 * Validate username structure like [name.lastname] with regex
 * @param username username to validate
 */
const validateUsername = (username: string) => {
	const reg = RegExp(/^\S+\.\S+$/gm);
	// validate regex
	const isValid = reg.test(username);
	// throw error if username not valid
	if (!isValid) {
		throw new Error(
			"Username structure not valid. Valid structure [name.lastname]"
		);
	} else {
		return true;
	}
};

export default validateUsername;
