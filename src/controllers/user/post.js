const { generateToken } = require('../../util/jwt');
const { validateErrorBody } = require('../../util/validator');
const { validateUserBody } = require('./rules');

exports.path = '/user';
exports.method = 'post';
exports.authenticate = false;
exports.middlewares = [validateUserBody, validateErrorBody];
exports.handler =
  (models) => async ({ body: { name, email, password, nickname } }, res) => {
    if (await models.repository.User.checkUserExists(email)) {
      return res.status(400).json({
        message: 'An user with this e-mail already exists',
      });
    }

    const user = await models.repository.User.createUser({
      name,
      email,
      password,
      nickname,
    });

    return res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        nickname: user.nickname,
      },
      token: generateToken({ id: user.id }),
    });
  };
