import express, { Application } from "express";
import cors from "cors";
import rankingRouter from "../router/rankingRouter.router";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    ranking: "/api/ranking",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";

    // Métodos iniciales
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.ranking, rankingRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
