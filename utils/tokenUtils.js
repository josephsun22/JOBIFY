import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
