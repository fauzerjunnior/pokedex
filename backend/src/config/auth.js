import '../bootstrap';

export default {
  secret: process.env.APP_SECRET,
  expiresIn: process.env.APP_SECRET_EXPIRESIN,
};
