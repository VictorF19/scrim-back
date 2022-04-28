const { body } = require('express-validator');

exports.validateUserBody = [
  body('email').isEmail(),
  body('name').trim().isString().notEmpty(),
  body('password').trim().isString().notEmpty(),
  body('nickname').trim().isString(),
];
