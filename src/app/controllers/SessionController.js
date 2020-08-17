import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../schemas/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {  
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({  email: email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.comparePassword(password, function(err, isMatch) {
      if (err) throw err;

      return res.status(401).json({ error: 'Password does not match' });
    })));

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
