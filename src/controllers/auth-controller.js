import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByUsername } from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  const user = await getUserByUsername(req.body.username);
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ user: userWithNoPassword, token });
};

const getMe = (req, res) => {
  if (res.locals.user) {
    res.json({ message: 'token ok', user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
};

export { getMe, postLogin };
