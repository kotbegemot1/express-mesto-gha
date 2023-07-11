const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let token;
  let payload;

  try {
    token = req.cookies.jwt;
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw new UnauthorizedError('Необходима авторизовация');
  }

  req.user = payload;

  return next();
};
