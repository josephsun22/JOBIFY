import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  const allowFirstAdmin = process.env.ALLOW_FIRST_ADMIN === 'true';
  req.body.role = isFirstAccount && allowFirstAdmin ? 'admin' : 'user';

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase().trim();
  }

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};
export const login = async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const user = await User.findOne({ email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({
    userId: user._id,
    userEmail: user.email,
    role: user.role,
    // mark demo/test user for downstream read-only checks
    testUser: user.email === 'test@test.com',
  });

  res.status(StatusCodes.OK).json({ token, msg: 'user logged in' });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
