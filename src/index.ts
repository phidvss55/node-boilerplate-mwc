import App from './app';
import { validateEnv } from './common/validateEnv';
import AuthenticationController from './modules/Authentication/controllers/authenticate.controller';
import ImagesController from './modules/ImageModule/controllers/images.controller';
import PostsController from './modules/PostModule/controllers/posts.controller';
import PostService from './modules/PostModule/services/posts.service';
import UserService from './modules/UserModule/services/user.service';

validateEnv();

const postService = new PostService();
const userService = new UserService();

const app = new App(
  [new PostsController(postService), new AuthenticationController(userService), new ImagesController()],
  5000,
);

app.listen();
