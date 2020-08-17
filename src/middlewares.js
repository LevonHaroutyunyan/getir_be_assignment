const helpers = require('./helpers');

function notFound(req, res, next) {
  res.status(404);

  const error = new Error(`${req.originalUrl} was not found`);
  return next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  const errMsg = process.env.NODE_ENV === 'production' ? err.msg : err.stack;

  res.json(helpers.getRespObj(res.statusCode, errMsg));
}

module.exports = {
  notFound,
  errorHandler
};
