exports.path = '/user';
exports.method = 'post';
exports.middlewares = [];
exports.handler = (models) => async (req, res) => {
  const { name, email, password, nickname } = req.body;
  // add verification if the user already exists
  const user = await models.repository.User.createUser({
    name,
    email,
    password,
    nickname,
  });
  return res.status(200).json(user);
};
