import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario não encontrao' });
    }
    if (!(await user.checkpassword(password))) {
      return res.status(401).json({ error: 'Senha errada' });
    }

    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.token, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
