import * as express from 'express';
import Post from '../interfaces/post.interface';
import PostService from '../services/posts.service';

class PostsController {
  public path = '/posts';
  public router = express.Router();

  private postService: PostService;

  constructor(postService: PostService) {
    this.intializeRoutes();
    this.postService = postService;
  }

  public intializeRoutes() {
    this.router.get('/posts', this.getAllPosts);
    this.router.post('/posts', this.createPost);
  }

  getAllPosts = (request: express.Request, response: express.Response) => {
    response.send({ posts: [] });
  };

  createPost = async (request: express.Request, response: express.Response) => {
    const post: Post = request.body;
    const res = await this.postService.createPost(post);

    response.send(res);
  };
}

export default PostsController;
