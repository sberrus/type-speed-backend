import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// routers
import rankingRouter from "../router/rankingRouter.router";
import { authRouter } from "../router/auth.router";
// bbdd connection
import sequelizeConnection from "../database/connection";

class Server {
	private app: Application;
	private port: string;
	private apiPaths = {
		ranking: "/api/ranking",
		auth: "/api/auth",
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || "8080";

		// Métodos iniciales
		this.bbddConnection();
		this.middlewares();
		this.routes();
	}

	async bbddConnection() {
		try {
			await sequelizeConnection.authenticate();
			console.log("BBDD connected");
		} catch (error: any) {
			throw new Error(error);
		}
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// Lectura del body
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.apiPaths.ranking, rankingRouter);
		this.app.use(this.apiPaths.auth, authRouter);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en puerto " + this.port);
		});
	}
}

export default Server;
