import * as bcrypt from 'bcryptjs';
import express from 'express';
import IController from '../../../factory/controller.interface';
import LoginDto from '../validations/login.dto';
import UserModel from '../../UserModule/entities/user.entity';
import validationMiddleware from '../../../middlewares/validation.middleware';
import UserAlreadyExistsException from '../exceptions/user-existed.exception';
import User from '../../UserModule/interfaces/user.interface';
import WrongCredentialsException from '../exceptions/wrong-credentials.exception';
import CreateUserDto from '../../UserModule/validations/create-user.dto';

class AuthenticationController implements IController {
  public path = '/auth';
  public router = express.Router();
  private user = UserModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loggingIn);
  }

  private register = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = request.body;
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user: User = await this.user.create({
        ...userData,
        password: hashedPassword,
      });

      const { password, ...newUser } = user;
      response.status(201).send(newUser);
    }
  };

  private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: LoginDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = '';
        response.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };
}

export default AuthenticationController;
