import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const getTokenFromHeader = (request) => {
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

const createAccessToken = (user) => {
  const payload = { userId: user._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });
};

const verifyAccessToken = (request, response, next) => {
  try {
    const token = getTokenFromHeader(request);
    
    if (!token) {
      return response.status(401).send({ message: 'Access token missing or improperly formatted.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return response.status(401).send({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
          return response.status(401).send({ message: 'Invalid token' });
        } else {
          return response.status(401).send({ message: 'Token verification failed' });
        }
      }

      request.body.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error('Unexpected error during token verification:', error);
    return response.status(500).send({ message: 'Internal server error' });
  }
};

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export { createAccessToken, verifyAccessToken };
