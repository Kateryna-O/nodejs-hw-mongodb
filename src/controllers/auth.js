import { loginUser } from '../services/auth.js';

export const loginUserController = async (req, res) => {
  await loginUser(req.body);
};
