import App from './app';
import { validateEnv } from './common/validateEnv';
import AuthenticationController from './modules/Authentication/controllers/authenticate.controller';
import AuthenticationService from './modules/Authentication/services/authenticate.service';
import ImagesController from './modules/ImageModule/controllers/images.controller';
import PostsController from './modules/PostModule/controllers/posts.controller';
import PostService from './modules/PostModule/services/posts.service';
import ReportController from './modules/ReportModule/controllers/report.controller';
import UserController from './modules/UserModule/controllers/user.controller';
import UserService from './modules/UserModule/services/user.service';

validateEnv();

const postService = new PostService();
const userService = new UserService();
const authenService = new AuthenticationService();

const app = new App(
  [
    new PostsController(postService),
    new AuthenticationController(userService, authenService),
    new ImagesController(),
    new ReportController(),
    new UserController(postService),
  ],
  5000,
);

app.listen();
