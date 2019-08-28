import * as Yup from 'yup';
import User from '../models/User';


class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falhou a validação' });
    }
    const existe = await User.findOne({ where: { email: req.body.email } });
    if (existe) {
      return res.status(400).json({ error: 'ja existe esse usuario' });
    }
    const {
      id, name, email, provider,
    } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // eslint-disable-next-line consistent-return
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      oldPassword: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falhou a validação' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const existe = await User.findOne({ where: { email: req.body.email } });
      if (existe) {
        return res.status(400).json({ error: 'ja existe esse usuario' });
      }
    }
    if (oldPassword && !(await user.checkpassword(oldPassword))) {
      return res.status(401).json({ erro: 'PassWord errado' });
    }

    const { id, name, provider } = await user.update(req.body);
    res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
