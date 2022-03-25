const { generateToken } = require('../../util/jwt');

exports.path = '/auth';
exports.method = 'post';
exports.authenticate = false;
exports.middlewares = [];
exports.handler = (models) => async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await models.repository.User.checkUserWithPassword({
    email,
    password,
  });

  if (foundUser.hasUser) {
    return res.status(200).json({
      token: generateToken({ id: foundUser.id }),
    });
  }

  return res.status(400).json({ message: 'Incorrect email/password' });
};
