import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import Post from '../interfaces/post.interface';
import PostService from '../services/posts.service';
import IController from '../../../factory/controller.interface';
import PostNotFoundException from '../exceptions/post-not-found.exception';
import validationMiddleware from '../../../middlewares/validation.middleware';
import CreatePostDto from '../validations/post.dto';
import authMiddleware from '../../../middlewares/auth.middleware';
import RequestWithUser from '../../Authentication/interfaces/requestWithUser.interface';

class PostsController implements IController {
  public path = '/posts';
  public router = express.Router();

  private postService: PostService;

  constructor(postService: PostService) {
    this.intializeRoutes();
    this.postService = postService;
  }

  public async intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);

    this.router
      .all(`${this.path}/*`, authMiddleware)
      .post(`${this.path}`, authMiddleware, validationMiddleware(CreatePostDto), this.createPost)
      .put(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.updatePostById)
      .delete(`${this.path}/:id`, this.removePostById);
  }

  getAllPosts = async (req: Request, res: Response) => {
    const response = await this.postService.getAllPosts();
    res.status(200).send(response);
  };

  createPost = async (req: RequestWithUser, res: Response) => {
    const post: Post = req.body;
    const response = await this.postService.createPost(post);

    res.send(response);
  };

  getPostById = async (request: Request, res: Response, next: NextFunction) => {
    const { id } = request.params;
    const _post = await this.postService.getPostById(id);
    if (_post) {
      res.status(200).send(_post);
    } else {
      next(new PostNotFoundException(id));
    }
  };

  updatePostById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const postData: Post = request.body;
    const res = await this.postService.updatePostById(id, postData);
    if (res) {
      response.status(200).send(res);
    } else {
      next(new PostNotFoundException(id));
    }
  };

  removePostById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const res = await this.postService.removePostById(id);

    response.status(200).send(res);
  };
}

export default PostsController;
