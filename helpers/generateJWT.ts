import jwt from "jsonwebtoken";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

const generateJWT = (uid: string) => {
	return new Promise((res, rej) => {
		// jwt payload data
		const payload = { uid };
		// secret
		// generate JWT
		if (!!JWT_PRIVATE_KEY) {
			jwt.sign(payload, JWT_PRIVATE_KEY, (error, token) => {
				if (error) {
					console.log(
						"🚀 ~ file: generateJWT.ts ~ line 14 ~ jwt.sign ~ error",
						error
					);
					rej("Error generating JWT");
				} else {
					res(token);
				}
			});
		} else {
			rej("JWT_SecretKey not provided");
		}
	});
};
export default generateJWT;
