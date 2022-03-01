const { generateToken } = require('../../util/jwt');

exports.path = '/auth';
exports.method = 'post';
exports.middlewares = [];
exports.handler = (models) => async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await models.repository.User.findUser({
    email,
    password,
  });

  if (foundUser.hasUser) {
    return res.status(200).json({
      user: foundUser.user,
      token: generateToken({ id: foundUser.id }),
    });
  }

  return res.status(400).json({ message: 'Incorrect email/password' });
};
