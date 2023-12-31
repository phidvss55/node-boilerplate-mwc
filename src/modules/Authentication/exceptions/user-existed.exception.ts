import HttpException from '../../../exceptions/http.exception';

class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

export default UserAlreadyExistsException;
