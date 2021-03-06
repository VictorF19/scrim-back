const { validationResult } = require('express-validator');

const errorsResponse = (errors) => {
  const response = [];
  errors.forEach((error) => {
    if (!response.find((r) => r.message === error.param)) {
      response.push({
        title: error.msg,
        message: error.param,
      });
    }
  });
  return response;
};

exports.validateErrorBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errorsResponse(errors.array()) });
  }
  return next();
};
