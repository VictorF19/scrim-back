const jwt = require('jsonwebtoken');
const { controllerHandler } = require('./controllerHandler');

const { TOKEN_SECRET, TOKEN_EXPIRATION_TIME } = process.env;

const verifyToken = (token) => jwt.verify(token, TOKEN_SECRET);

exports.validateAuthorization = controllerHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const splitedAuthHeader = authHeader.split(' ');
  if (
    splitedAuthHeader.length !== 2 ||
    !/^Bearer$/i.test(splitedAuthHeader[0])
  ) {
    return res.status(401).json({ message: 'Invalid Authentication format' });
  }

  const validatedToken = await verifyToken(splitedAuthHeader[1]);
  if (!validatedToken) {
    return res.status(401).json({ message: 'Invalid token provided' });
  }

  req.auth_token = validatedToken;
  return next();
});

// eslint-disable-next-line arrow-body-style
exports.generateToken = (object) => {
  return jwt.sign(object, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION_TIME,
  });
};
