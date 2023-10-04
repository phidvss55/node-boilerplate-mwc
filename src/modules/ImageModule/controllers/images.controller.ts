import * as express from 'express';

class ImagesController {
  public router = express.Router();

  // private posts: Post[] = [
  //   {
  //     author: 'Marcin',
  //     content: 'Dolor sit amet',
  //     title: 'Lorem Ipsum',
  //   },
  // ];

  // constructor() {
  //   this.intializeRoutes();
  // }

  // public intializeRoutes() {
  //   this.router.get('/posts', this.getAllPosts);
  //   this.router.post('/posts', this.createAPost);
  // }

  // getAllPosts = (request: express.Request, response: express.Response) => {
  //   response.send(this.posts);
  // };

  // createAPost = (request: express.Request, response: express.Response) => {
  //   const post: Post = request.body;
  //   this.posts.push(post);
  //   response.send(post);
  // };
}

export default ImagesController;
