import PostModel from '../entities/post.entity';
import Post from '../interfaces/post.interface';

class PostService {
  async createPost(postData: Post) {
    const createdPost = new PostModel(postData);
    return await createdPost.save();
  }

  getImageList(): string[] {
    return ['image1.jpg', 'image2.png'];
  }
}

export default PostService;
