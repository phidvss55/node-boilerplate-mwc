import * as bcrypt from 'bcryptjs';
import express, { Request, Response, NextFunction } from 'express';
import IController from '../../../factory/controller.interface';
import LoginDto from '../validations/login.dto';
import UserModel from '../../UserModule/entities/user.entity';
import validationMiddleware from '../../../middlewares/validation.middleware';
import UserAlreadyExistsException from '../exceptions/user-existed.exception';
import WrongCredentialsException from '../exceptions/wrong-credentials.exception';
import CreateUserDto from '../../UserModule/validations/create-user.dto';
import UserService from '../../UserModule/services/user.service';
import { asJson } from '../../../common/utils';
import { comparePassword, createCookie, createToken } from '../utils/token';
import authMiddleware from '../../../middlewares/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import AuthenticationService from '../services/authenticate.service';

class AuthenticationController implements IController {
  public path = '/auth';
  public router = express.Router();
  private user = UserModel;

  private userService: UserService;
  private authenticationService: AuthenticationService;

  constructor(userService: UserService, authenService: AuthenticationService) {
    this.initializeRoutes();
    this.userService = userService;
    this.authenticationService = authenService;
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loggingIn);
    this.router.post(`${this.path}/logout`, this.loggingOut);
    this.router.post(`${this.path}/2fa/generate`, authMiddleware, this.generateTwoFactorAuthenticationCode);
  }

  public register = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    const checkUser = await this.userService.findUserByEmail(userData.email);

    if (checkUser) {
      next(new UserAlreadyExistsException(userData.email));
    } else {
      const user = await this.userService.createUser(userData);

      const tokenData = createToken(user);
      response.setHeader('Set-Cookie', [createCookie(tokenData)]);
      response.status(201).json(asJson(true, user));
    }
  };

  public loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: LoginDto = request.body;
    const user = await this.userService.findUserByEmail(logInData.email);
    if (user) {
      const isMatching = await comparePassword(logInData.password, user?.password || '');
      if (isMatching) {
        user.password = undefined;

        const tokenData = createToken(user);
        response.setHeader('Set-Cookie', [createCookie(tokenData)]);
        response.status(200).send(
          asJson(true, {
            user,
            token: tokenData,
          }),
        );
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  public loggingOut = (req: Request, res: Response) => {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    res.status(200).send(asJson(true, { token: null }));
  };

  public generateTwoFactorAuthenticationCode = async (request: RequestWithUser, response: Response) => {
    const user = request.user;
    const { otpauthUrl, base32 } = this.authenticationService.getTwoFactorAuthenticationCode();

    await this.user.findByIdAndUpdate(user?._id, {
      twoFactorAuthenticationCode: base32,
    });
    this.authenticationService.respondWithQRCode(otpauthUrl || '', response);
  };
}

export default AuthenticationController;
