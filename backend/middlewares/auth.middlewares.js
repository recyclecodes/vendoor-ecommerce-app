import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/auth.model.js';

dotenv.config();

export const getTokenFromHeader = (request) => {
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

export const createAccessToken = (user) => {
  const payload = { userId: user._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });
};

export const createRefreshToken = (user) => {
  const payload = { userId: user._id };
  return jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: '1d',
  });
};

export const verifyAccessToken = async (request, response, next) => {
  try {
    const token = getTokenFromHeader(request);

    if (!token) {
      return response
        .status(401)
        .send({ message: 'Access token missing or improperly formatted.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return response.status(401).send({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
          return response.status(401).send({ message: 'Invalid token' });
        } else {
          return response
            .status(401)
            .send({ message: 'Token verification failed' });
        }
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
        return response.status(401).send({ message: 'User not found' });
      }

      request.user = user;
      next();
    });
  } catch (error) {
    console.error('Unexpected error during token verification:', error);
    return response.status(500).send({ message: 'Internal server error' });
  }
};

export const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH,
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}
