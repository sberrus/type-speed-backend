import jwt from "jsonwebtoken";

const generateJWT = (uid: string) => {
	return new Promise((res, rej) => {
		// jwt payload data
		const payload = { uid };
		// secret
		const secret = process.env.JWT_PRIVATE_KEY as string;
		// generate JWT
		jwt.sign(payload, secret, (error, token) => {
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
