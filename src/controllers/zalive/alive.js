exports.path = '/alive';
exports.method = 'get';
exports.authenticate = false;
exports.middlewares = [];
exports.handler = (models) => async (req, res) => {
  await models.repository.User.checkUserExists('')
  return res.status(200).json({ status: 'Working!' });
};
