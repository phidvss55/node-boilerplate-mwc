import express from 'express';
import bodyParser from 'body-parser';
import { connectionToDatabase } from './database';

class Application {
  public app: express.Application;
  public port: number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any[]) {
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
