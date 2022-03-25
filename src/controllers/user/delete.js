exports.path = '/user/:id';
exports.method = 'delete';
exports.authenticate = true;
exports.middlewares = [];
exports.handler = (models) => async (req, res) => {
  const { id } = req.params;

  await models.repository.User.deleteUserById(id);

  return res.status(200);
};
