import { Request } from 'express';
import User from '../../UserModule/interfaces/user.interface';

interface RequestWithUser extends Request {
  user?: User;
}

export default RequestWithUser;
