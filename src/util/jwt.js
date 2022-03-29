const jwt = require('jsonwebtoken');
const { controllerHandler } = require('./controllerHandler');

const { TOKEN_SECRET, TOKEN_EXPIRATION_SEC } = process.env;

const verifyToken = (token) => jwt.verify(token, TOKEN_SECRET);

// exports.validateToken = async (token) => {
//   try {
//     if (
//       !/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\\+\\/=]*)$/i.test(
//         token,
//       )
//     ) {
//       return false;
//     }

//     return await verifyToken(token);
//   } catch {
//     return false;
//   }
// };

exports.validateAuthorization = controllerHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.send(401, 'Authentication required');
  const splitedAuthHeader = authHeader.split(' ');
  if (
    splitedAuthHeader.length !== 2 ||
    !/^Bearer$/i.test(splitedAuthHeader[0])
  ) {
    return res.send(401, 'Invalid Authentication format');
  }

  const validatedToken = await verifyToken(splitedAuthHeader[1]);
  if (!validatedToken) {
    return res.send(401, 'Invalid token provided');
  }

  req.auth_token = validatedToken;
  return next();
});

// eslint-disable-next-line arrow-body-style
exports.generateToken = (object) => {
  return jwt.sign(object, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION_SEC,
  });
};
