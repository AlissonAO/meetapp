import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authconfig from '../../config/auth';


export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  try {
    const decoder = await promisify(jwt.verify)(token, authconfig.token);
    req.userId = decoder.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};
