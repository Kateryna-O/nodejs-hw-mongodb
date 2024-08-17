import createHttpError from 'http-errors';
import { SessionCollection } from '../model/session.js';
import { UsersCollection } from '../model/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (typeof authHeader !== 'string') {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authHeader.split(' ', 2);

  if (bearer !== 'Bearer' || !accessToken) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  const session = await SessionCollection.findOne({ accessToken: accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  const isAccessTokenExpire =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpire) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    return next(createHttpError(401));
  }

  req.user = user;
  next();
};
