import express from 'express';
import bodyParser from 'body-parser';
import { connectionToDatabase } from './database';
import IController from './factory/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import loggerMiddleware from './middlewares/logger';

class Application {
  public app: express.Application;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(loggerMiddleware);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: IController[]) {
    const { API_VERSION } = process.env;
    controllers.forEach((controller) => {
      this.app.use(`/${API_VERSION}`, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private connectToTheDatabase() {
    connectionToDatabase();
  }
}

export default Application;
