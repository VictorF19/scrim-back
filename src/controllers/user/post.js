const { generateToken } = require('../../util/jwt');

exports.path = '/user';
exports.method = 'post';
exports.middlewares = [];
exports.handler = (models) => async (req, res) => {
  const { name, email, password, nickname } = req.body;
  const user = await models.repository.User.createUser({
    name,
    email,
    password,
    nickname,
  });
  return res.status(200).json({ user, token: generateToken({ id: user.id }) });
};
