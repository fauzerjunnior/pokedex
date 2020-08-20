import * as Yup from 'yup';

import User from '../schemas/User';

class UserController {
  async index(req, res) {
    const users = await User.find().sort({ createdAt: 'desc' });

    return res.status(200).json(users);
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json();
  }

  async update(req, res) {
    const user = await User.findById(req.params.id);

    const { name, email, password } = await user.update(req.body);

    return res.status(200).json(name, email, password);
  }

  async delete(req, res) {
    await User.findByIdAndRemove(req.params.id);

    return res.status(200).json();
  }
}

export default new UserController();
