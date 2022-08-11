import jwt from "jsonwebtoken";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

const generateJWT = (uid: string) => {
	return new Promise((res, rej) => {
		// jwt payload data
		const payload = { uid };
		// secret
		// generate JWT
		jwt.sign(payload, JWT_PRIVATE_KEY, (error, token) => {
			if (error) {
				console.log(error);
				rej("Error generating JWT");
			} else {
				res(token);
			}
		});
	});
};
export default generateJWT;
