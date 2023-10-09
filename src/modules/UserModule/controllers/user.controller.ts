import express, { NextFunction, Response, Router } from 'express';
import IController from '../../../factory/controller.interface';
import authMiddleware from '../../../middlewares/auth.middleware';
import RequestWithUser from '../../Authentication/interfaces/requestWithUser.interface';
import PostService from '../../PostModule/services/posts.service';
import NotAuthorizedException from '../../../exceptions/not-authorized.exception';

class UserController implements IController {
  public path: string = '/users';
  public router: Router = express.Router();
  public postService: PostService;

  constructor(postService: PostService) {
    this.initializeRoutes();
    this.postService = postService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
  }

  private getAllPostsOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    if (userId === req?.user?._id.toString()) {
      const posts = await this.postService.findByCondition({
        author: userId,
      });
      res.send(posts);
    }
    next(new NotAuthorizedException());
  };
}

export default UserController;
