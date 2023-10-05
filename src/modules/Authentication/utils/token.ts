import User from '../../UserModule/interfaces/user.interface';
import { DataStoredInToken, TokenData } from '../interfaces/token.interface';
import * as jwt from 'jsonwebtoken';

export const createToken = (user: User): TokenData => {
  const expiresIn = 60 * 60;
  const secret = process.env.JWT_SECRET ?? '';
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id,
  };

  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  };
};
